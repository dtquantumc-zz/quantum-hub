# Copyright 2019 D-Wave Systems Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# (2020)
# Modifications have been made
# by Diversifying Talent in Quantum Computing, Geering Up, UBC
#
# Modifications were made to enable the tool to be callable
# as a background process

from __future__ import print_function

import dimod
import math
import sys
import os

from dimod.generators.constraints import combinations
from hybrid.reference import KerberosSampler
from dwave.system import DWaveSampler



def get_label(row, col, digit):
    """Returns a string of the cell coordinates and the cell value in a
    standard format.
    """
    return "{row},{col}_{digit}".format(**locals())


def get_matrix(filename):
    """Return a list of lists containing the content of the input text file.

    Note: each line of the text file corresponds to a list. Each item in
    the list is from splitting the line of text by the whitespace ' '.
    """
    with open(filename, "r") as f:
        content = f.readlines()

    lines = []
    for line in content:
        new_line = line.rstrip()    # Strip any whitespace after last value

        if new_line:
            new_line = list(map(int, new_line.split(' ')))
            lines.append(new_line)

    return lines


def is_correct(matrix):
    """Verify that the matrix satisfies the Sudoku constraints.

    Args:
      matrix(list of lists): list contains 'n' lists, where each of the 'n'
        lists contains 'n' digits.
    """
    n = len(matrix)        # Number of rows/columns
    m = int(math.sqrt(n))  # Number of subsquare rows/columns
    unique_digits = set(range(1, n+1))  # Digits in a solution

    # Verifying rows
    for row in matrix:
        if set(row) != unique_digits:
            print("Error in row: ", row)
            return False

    # Verifying columns
    for j in range(n):
        col = [matrix[i][j] for i in range(n)]
        if set(col) != unique_digits:
            print("Error in col: ", col)
            return False

    # Verifying subsquares
    subsquare_coords = [(i, j) for i in range(m) for j in range(m)]
    for r_scalar in range(m):
        for c_scalar in range(m):
            subsquare = [matrix[i + r_scalar * m][j + c_scalar * m] for i, j
                         in subsquare_coords]
            if set(subsquare) != unique_digits:
                print("Error in sub-square: ", subsquare)
                return False

    return True


def get_result(matrix):
    result = dict()
    result["solved_board"] = matrix

    # Verify
    result["solution_message"] = ""
    if is_correct(matrix):
        result["solution_message"] = "The solution is correct"
    else:
        result["solution_message"] = "The solution is incorrect"

    return result


def main(matrix=None, token=None):
    """
    Takes in a matrix to be solved, as well as the authentication token to be
    sent to Dwave. Returns its best try at solving that matrix with few
    conflicts.

    This uses the Kerberos Sampler, which means that it will do a lot of computation
    on the computer running this itself. Solving can take up to 30 seconds for
    difficult problems.

    :param matrix: A 2-dimensional 9x9 array describing the sudoku.
        Zero indicates a blank space to be filled in, while any number
        from 1 to 9 represents that number.
    
    :param token: The Dwave token to be used.
        This should be a string, in the format used on the dwave leap website.

    :return: Returns a dictionary object. The key "solution message" gives a message.
        The key "solved_board" contains the resulting sudoku board, in the same
        format as the input.

    """
    # Note: for the purposes of a code example, main() is written as a script

    endpoint = 'https://cloud.dwavesys.com/sapi/'
    client = 'qpu'
    #solver = 'DW_2000Q_6' # Use this to specify a solver, but leave commented out to let D-Wave's system autochoose a solver
    try:
        qpu_sampler = DWaveSampler(
            client=client,
            endpoint=endpoint,
            token=token)
            #solver=solver)
    except Exception as e:
        print(e)
        return {'error':'Token not accepted'}

    if matrix is None:
        filename = 'problem.txt'
        dir_name = os.path.dirname(os.path.realpath(__file__))

        filename = os.path.join(dir_name, filename)
        print("Warning: using default problem file, '{}'. Usage: python "
              "{} <sudoku filepath>".format(filename, sys.argv[0]))

        matrix = get_matrix(filename)

    # Set up
    n = len(matrix)          # Number of rows/columns in sudoku
    m = int(math.sqrt(n))    # Number of rows/columns in sudoku subsquare
    digits = range(1, n+1)

    bqm = dimod.BinaryQuadraticModel({}, {}, 0.0, dimod.SPIN)

    # Constraint: Each node can only select one digit
    for row in range(n):
        for col in range(n):
            node_digits = [get_label(row, col, digit) for digit in digits]
            one_digit_bqm = combinations(node_digits, 1, strength=1.5)
            # print(one_digit_bqm)
            bqm.update(one_digit_bqm)

    # Constraint: Each row of nodes cannot have duplicate digits
    for row in range(n):
        for digit in digits:
            row_nodes = [get_label(row, col, digit) for col in range(n)]
            row_bqm = combinations(row_nodes, 1)
            # print(row_bqm)
            bqm.update(row_bqm)

    # Constraint: Each column of nodes cannot have duplicate digits
    for col in range(n):
        for digit in digits:
            col_nodes = [get_label(row, col, digit) for row in range(n)]
            col_bqm = combinations(col_nodes, 1)
            # print(col_bqm)
            bqm.update(col_bqm)

    # Constraint: Each sub-square cannot have duplicates
    # Build indices of a basic subsquare
    subsquare_indices = [(row, col) for row in range(3) for col in range(3)]

    # Build full sudoku array
    for r_scalar in range(m):
        for c_scalar in range(m):
            for digit in digits:
                # Shifts for moving subsquare inside sudoku matrix
                row_shift = r_scalar * m
                col_shift = c_scalar * m

                # Build the labels for a subsquare
                subsquare = [get_label(row + row_shift, col + col_shift, digit)
                             for row, col in subsquare_indices]
                subsquare_bqm = combinations(subsquare, 1)
                # print(subsquare_bqm)
                bqm.update(subsquare_bqm)

    # Constraint: Fix known values
    for row, line in enumerate(matrix):
        for col, value in enumerate(line):
            if value > 0:
                # Recall that in the "Each node can only select one digit"
                # constraint, for a given cell at row r and column c, we
                # produced 'n' labels. Namely,
                # ["r,c_1", "r,c_2", ..., "r,c_(n-1)", "r,c_n"]
                #
                # Due to this same constraint, we can only select one of these
                # 'n' labels (achieved by 'generators.combinations(..)').
                #
                # The 1 below indicates that we are selecting the label
                # produced by 'get_label(row, col, value)'. All other labels
                # with the same 'row' and 'col' will be discouraged from being
                # selected.
                for val in digits:
                    if val == value:
                        bqm.fix_variable(get_label(row, col, value), 1)
                    else:
                        bqm.fix_variable(get_label(row, col, val), -1)

    if len(bqm) == 0:
        print("That was a full Sudoku!")
        return get_result(matrix)

    bqm.scale(10)

    # Solve BQM
    sampler = KerberosSampler()
    solution = sampler.sample(bqm,
                              max_iter=10,
                              convergence=3,
                              energy_threshold=0.0,
                              qpu_sampler=qpu_sampler)
    # print(solution)
    best_solution = solution.first.sample

    # Print solution
    solution_list = [k for k, v in best_solution.items() if v == 1]

    # New Matrix
    # matrix = [[0 for x in range(n)] for y in range(n)]

    for label in solution_list:
        coord, digit = label.split('_')
        row, col = map(int, coord.split(','))
        if matrix[row][col]:
            print(f'Duplicate answer: {row}, {col} = {matrix[row][col]} or {digit}?')
        else:
            matrix[row][col] = int(digit)

    # result = get_result(matrix)
    # print(solution.info)
    # result["timing"] = solution.record['timing']
    return get_result(matrix)


if __name__ == "__main__":
    # main()
    print("Please call the function main() with a sampler provided")

