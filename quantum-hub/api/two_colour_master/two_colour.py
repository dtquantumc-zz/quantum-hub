# SPDX-License-Identifier: MIT
#
# (C) Copyright 2020
# Diversifying Talent in Quantum Computing, Geering Up, UBC

# 1. Import tools
from dwave.system import DWaveSampler, EmbeddingComposite
import dwave.inspector as insp
# from dimod import ExactSolver
# from neal import SimulatedAnnealingSampler

token = 'DEV-98f37d3736d62d7061eaa5e68214a92eadb2393b' # Ari

def load_problem(filename):
    ''' Returns a representation of the input graph.

    This is a tuple containing an integer, the number of nodes,
    as well as a tuple of tuples representing each pair of neighbours.
    Nodes are 0-indexed'''
    with open(filename, 'r') as f:
        content = f.readlines()
    
    n = int(content[0].rstrip())

    neighbours = tuple( tuple(int(x) for x in line.rstrip().split()) for line in content[1:] )

    return n, neighbours


def main(token=token, n_vertices=0, neighbours=None, filename=None, local=False):
    ''' Using any graph at all, if given the number of nodes
    and the neighbours, 0-indexed, this will try to minimize the
    number of same-coloured neighbours.

    Runs on the Basic Dwave Solver, so very quickly and painlessly
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