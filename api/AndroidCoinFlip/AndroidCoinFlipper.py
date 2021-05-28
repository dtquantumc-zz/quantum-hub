# SPDX-License-Identifier: MIT
#
# (C) Copyright 2020
# Diversifying Talent in Quantum Computing, Geering Up, UBC

# 1. Import tools
from dwave.system import DWaveSampler, EmbeddingComposite

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
    
    ''' 
    Using any graph at all, if given the number of nodes
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

    :param token: The D-Wave token to be used.
        This should be a string, in the format used on the dwave leap website.

    :return: This returns a dictionary. The only key is "solution",
        containing an ordered list of the states of the vertices for the best solution.
        Each state is either 1 or -1.
    '''
    if filename == None:
        filename = 'flipCoinProblem.txt'

    if neighbours == None:
        n_vertices, neighbours = load_problem(filename)

    # 2. Define problem

    h = [0 for x in range(n_vertices)]
    # Make sure to set coupling to -10 to force all nodes to have the same state/color/spin.
    J = dict( (tuple(neighbour), -10) for neighbour in neighbours )

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
    insp.show( main('', local=True) )


''' To solve using Kerberos Sampler:

import dwavebinarycsp
from hybrid.reference.kerberos import KerberosSampler
from utilities import visualize_map

class Node:
    def __init__(self, name):
        self.name = name
        self.up = name + "_u"
        self.down = name + "_d"



Nodes are arranged in the following mapping:
0 1 2
3 4 5
6 7 8


node0 = Node("N0")
node1 = Node("N1")
node2 = Node("N2")
node3 = Node("N3")
node4 = Node("N4")
node5 = Node("N5")
node6 = Node("N6")
node7 = Node("N7")
node8 = Node("N8")

nodes = [node0, node1, node2, node3, node4, node5, node6, node7, node8]

neighbours = [
    (node0, node1),
    (node0, node3),
    (node1, node2),
    (node1, node4),
    (node2, node5),
    (node3, node4),
    (node3, node6),
    (node4, node5),
    (node4, node7),
    (node5, node8),
    (node6, node7),
    (node7, node8)
    ]

# Initialize constraint satisfaction problem
csp = dwavebinarycsp.ConstraintSatisfactionProblem(dwavebinarycsp.BINARY)
same_spin = {(0, 0), (1, 1)}
select_one = {(0, 1),
              (1, 0)}


# Apply one spin constraint
for n in nodes:
    csp.add_constraint(select_one, {n.up, n.down})

# Apply same spin between neighbours
for x, y in neighbours:
    csp.add_constraint(same_spin, {x.up, y.up})
    csp.add_constraint(same_spin, {x.down, y.down})

# Combine constraints to form a BQM
bqm = dwavebinarycsp.stitch(csp)

# Solve BQM
solution = KerberosSampler().sample(bqm)
best_solution = solution.first.sample
print("Solution: ", best_solution)

# Verify
is_correct = csp.check(best_solution)
print("Does solution satisfy our constraints? {}".format(is_correct))

# Visualize the solution
# Note: The following is purely for visualizing the output. This will help the front-end dev for the app.

# Hard code node positions to be the positions of the Android lock screen
node_positions = {"N8": (2, 1),
                  "N7": (1, 1),
                  "N6": (0, 1),
                  "N5": (2, 2),
                  "N4": (1, 2),
                  "N3": (0, 2),
                  "N2": (2, 3),
                  "N1": (1, 3),
                  "N0": (0, 3)}

nodes2 = [u.name for u in nodes]
edges = [(u.name, v.name) for u, v in neighbours]
#visualize_map(nodes2, edges, best_solution, node_positions=node_positions)

'''
