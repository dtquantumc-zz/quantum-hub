# SPDX-License-Identifier: MIT
#
# (C) Copyright 2020
# Diversifying Talent in Quantum Computing, Geering Up, UBC

# 1. Import tools
from dwave.system import DWaveSampler, EmbeddingComposite
import dwave.inspector as insp
# from dimod import ExactSolver
# from neal import SimulatedAnnealingSampler

def load_problem(filename):
    ''' Returns a representation of the input graph.

    This is a tuple containing an integer, the number of nodes,
    as well as a tuple of tuples representing each pair of neighbours.
    Nodes are 0-indexed.
    
    :param filename: A text string with the file to be loaded

    :return: A tuple. The first item is the number of nodes.
        The second item is a tuple representing the binary
        relations of connected nodes.
        Each relation is a tuple with two neighbouring node indices.
    '''
    with open(filename, 'r') as f:
        content = f.readlines()
    
    n = int(content[0].rstrip())

    neighbours = tuple( tuple(int(x) for x in line.rstrip().split()) for line in content[1:] )

    return n, neighbours


def main(token='', n_vertices=0, neighbours=None, filename=None, local=False):
    ''' Using any graph at all, if given the number of nodes
    and the neighbours, 0-indexed, this will try to minimize the
    number of same-coloured neighbours.

    Runs on the Basic Dwave Solver, so very quickly and painlessly.

    :param n_vertices: This is the number of vertices in the graph to be 2-coloured.
        Vertices should be 0-indexed.

    :param neighbours: This is the adjacency list describing the graph.
        This should only describe vertex indices, 0-indexed.
    
    :param filename: If the problem is desired to be loaded from a file,
        this string should be the path to that file.
    
    :param local: Utilized solely by __main__, will make the program output
        the whole solution for display in Dwave's web inspector.

    :param token: The Dwave token to be used.
        This should be a string, in the format used on the dwave leap website.

    :return: This returns a dictionary. The only key is "solution",
        containing an ordered list of the states of the vertices for the best solution.
        Each state is either 1 or -1.

    '''
    if filename == None:
        filename = 'problem.txt'

    if neighbours == None:
        n_vertices, neighbours = load_problem(filename)

    # 2. Define problem

    h = [0 for x in range(n_vertices)]
    J = dict( (tuple(neighbour), 10) for neighbour in neighbours )
    # print(J)

    # 3. Instantiate solver
    sampler = EmbeddingComposite(DWaveSampler(token=token))

    # 4. Sample problem

    solution = sampler.sample_ising(h, J, chain_strength=50, num_reads=50)

    # 5. Use response

    best_solution = [int(solution.first.sample[x]) for x in range(n_vertices)]

    # print( best_solution )
    if local:
        return solution
    else:
        return {'solution': best_solution}


if __name__ == "__main__":
    insp.show( main(token, local=True) )