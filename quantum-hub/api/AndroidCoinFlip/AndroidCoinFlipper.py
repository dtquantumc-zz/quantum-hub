import dwavebinarycsp
from hybrid.reference.kerberos import KerberosSampler
from utilities import visualize_map

class Node:
    def __init__(self, name):
        self.name = name
        self.up = name + "_u"
        self.down = name + "_d"


'''
Nodes are arranged in the following mapping:
0 1 2
3 4 5
6 7 8
'''

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
visualize_map(nodes2, edges, best_solution, node_positions=node_positions)