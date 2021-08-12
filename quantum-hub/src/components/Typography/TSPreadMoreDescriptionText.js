// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

export default function TSPreadMoreDescriptionText () {
  return (
    <>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Objective</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        This is an app to help visualize and solve the TSP for a preset list of locations
        throughout North America and Vancouver.
        This app runs the TSP on Dwave's Quantum Annealer.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Instructions</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <ol>
          <li>Start off by choosing the locations you would like to visit by clicking on them to select them</li>
          <li>Then click "Solve" to send the problem to the quantum annealer</li>
          <li>After solving, click "Full Screen" to look more closely, or "Reset" to solve a different problem.</li>
        </ol>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        When you submit a problem to one of D-Wave's solvers, you are put in a queue.
        The time it takes to solve your TSP will depend on where you are in that queue.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Quantum Randomness</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        D-Wave's solvers are probabilistic, meaning that each run <i>might</i> result in a different
        solution. That is why problems are <i>sampled</i> many times, to make sure that the correct
        solution is identified. The TSP usually has <i>one</i> unique optimal solution,
        but many close-to-optimal solutions. D-Wave's computer usually finds one of these
        close-to-optimal solutions.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        For instance, try solving for all the cities a couple times. It may differ slightly,
        because there are several paths with similar total distance.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Problem Background</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        This application uses a script from
        D-Wave's Ocean tools.
        The code for the tool can be found <Link href='https://docs.ocean.dwavesys.com/projects/dwave-networkx/en/latest/_modules/dwave_networkx/algorithms/tsp.html#traveling_salesperson_qubo' style={{ color: '#1599bf' }}>in Dwave's documentation</Link>.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        Using classical computing we cannot always find the best solution
        to this problem in a reasonable time, especially when the number of cities increases.
        This is because the solution requires an exponential amount of resources.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        On the other hand, using quantum annealing, we can solve this problem faster
        for a larger list of cities. The solution offered for this problem can be used
        for solving any other form of TSP, such as finding the shortest path a bee can take
        to visit all the flowers in an area.
      </Typography>
    </>
  )
}
