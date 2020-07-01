import networkx as nx
import dimod
from tabu import TabuSampler
from dwave_networkx.algorithms.tsp import traveling_salesperson_qubo


def make_graph(cities,list_id):

    n=len(cities)

    if (n>12 or n<3 or list_id>1):
        raise ValueError("Number of cities or the list ID not within the limits!")

    edges_list=[]

    #list_id=0
    #cities:
    #0: A: Albuquerque
    #1: B: Boston
    #2: C: Charlotte, NC
    #3: Detroit
    #4: Evanston, IL
    #5: Frankfort, Kentucky
    #6: Gulfport, Mississippi
    #7: Toronto, ON, CA
    #8: Vancouver, BC, CA
    #9: Winnipeg, MB, CA
    #10: Calgary, AB, CA
    #11: Regina, SK, CA
    #12: Montréal, QC, CA

    # Networkx graph of the problem. Distances measured in miles.
    edges_list.append([
        (0, 1, 2230),
        (0, 2, 1631),
        (0, 3, 1566),
        (0, 4, 1346),
        (0, 5, 1352),
        (0, 6, 1204),
        (0, 7, 2895),
        (0, 8, 2513),
        (0, 9, 2340),
        (0, 10, 2344),
        (0, 11, 2063),
        (0, 12, 3423),
        (1, 2, 845),
        (1, 3, 707),
        (1, 4, 1001),
        (1, 5, 947),
        (1, 6, 1484),
        (1, 7, 886),
        (1, 8, 5085),
        (1, 9, 2972),
        (1, 10, 4151),
        (1, 11, 3432),
        (1, 12, 495),
        (2, 3, 627),
        (2, 4, 773),
        (2, 5, 424),
        (2, 6, 644),
        (2, 7, 1220),
        (2, 8, 4720),
        (2, 9, 2608),
        (2, 10, 3787),
        (2, 11, 3068),
        (2, 12, 1585),
        (3, 4, 302),
        (3, 5, 341),
        (3, 6, 1027),
        (3, 7, 393),
        (3, 8, 3991),
        (3, 9, 1843),
        (3, 10, 3023),
        (3, 11, 2303),
        (3, 12, 899),
        (4, 5, 368),
        (4, 6, 916),
        (4, 7, 865),
        (4 ,8, 976),
        (4, 9, 1348),
        (4, 10, 2567),
        (4, 11, 1847),
        (4, 12, 3540),
        (5, 6, 702),
        (5, 7, 916),
        (5, 8, 4048),
        (5, 9, 1954),
        (5, 10, 3133),
        (5, 11, 2413),
        (5, 12, 1444),
        (6, 7, 2021),
        (6, 8, 4451),
        (6, 9, 2620),
        (6, 10, 3772),
        (6, 11, 3052),
        (6, 12, 2549),
        (7, 8, 4172),
        (7, 9, 2030),
        (7, 10, 3238),
        (7, 11, 2519),
        (7, 12, 542),
        (8, 9, 2319),
        (8, 10, 973),
        (8, 11, 1743),
        (8, 12, 4557),
        (9, 10, 1327),
        (9, 11, 572),
        (9, 12, 2269),
        (10, 11, 758),
        (10, 12, 3527),
        (11, 12, 2850)
    ])

    #list_id=1
    #Vancouver locations
    #0: UBC campus
    #1: SFU campus
    #2:Canada Place
    #3:Rogers Arena
    #4:Stanley park
    #5:Metropolise at Metrotown
    #6:Lafarge lake
    #7:Burnaby lake
    #8:Queen Elizabeth park

    edges_list.append([
        (0, 1, 16.5),
        (0, 2, 7.3),
        (0, 3, 7.3),
        (0, 4, 7.9),
        (0, 5, 11.3),
        (0, 6, 24.7),
        (0, 7, 14.9),
        (0, 8, 9.8),
        (1, 2, 9.2),
        (1, 3, 9.1),
        (1, 4, 10.6),
        (1, 5, 7.3),
        (1, 6, 8),
        (1, 7, 4.4),
        (1, 8, 17.5),
        (2, 3, 1),
        (2, 4, 1.2),
        (2, 5, 9.4),
        (2, 6, 17.1),
        (2, 7, 10.1),
        (2, 8, 6.1),
        (3, 4, 1.9),
        (3, 5, 7.2),
        (3, 6, 19.2),
        (3, 7, 8.8),
        (3, 8, 4.9),
        (4, 5, 8.9),
        (4, 6, 20.8),
        (4, 7, 11.7),
        (4, 8, 7.7),
        (5, 6, 13.3),
        (5, 7, 5.6),
        (5, 8, 8.3),
        (6, 7, 8.9),
        (6, 8, 29.9),
        (7, 8, 15.5)
    ])

    tmp_edges=[]

    for edge in edges_list[list_id]:
        if(edge[0] in cities and edge[1] in cities):
            tmp_edges.append(edge)

    G = nx.Graph()
    G.add_weighted_edges_from(tmp_edges)

    return G


def TSP_solver(G):
    # Lagrange multiplier, to weigh the constraints versus the mileage
    lagrange = 4000

    n=len(G)

    # Use dwave_networkx method to get the QUBO
    Q = traveling_salesperson_qubo(G, lagrange=lagrange)

    # Include the energy offset so that the energy comes out in miles
    offset = 2 * n * lagrange

    # Choose a sampler
    sampler = TabuSampler()

    # Get a BQM and run the problem
    bqm = dimod.BinaryQuadraticModel.from_qubo(Q, offset=offset)
    response = sampler.sample(bqm)

    # Turn the bitstring result into a trip/loop
    start = None
    sample = response.first.sample
    cost = response.first.energy
    route = [None] * n

    for (city, time), val in sample.items():
        if val:
            route[time] = city

    if start is not None and route[0] != start:
        # rotate to put the start in front
        idx = route.index(start)
        route = route[-idx:] + route[:-idx]

    # If there is a valid solution, print it
    if None not in route:
        ans=nx.Graph()

        tmp_edges=[]

        for i in range(0,len(route)-1):
            tmp_edges.append((route[i],route[i+1],G.get_edge_data(route[i],route[i+1])))

        ans.add_weighted_edges_from(tmp_edges)

        print(route)
        print(cost)

        return route, cost, ans


def main():
    TSP_solver(make_graph([1,3,5,4,7,8,9,10,11,12],0))

if __name__ == "__main__":
    main()

