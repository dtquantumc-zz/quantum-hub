// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'

export default function TSPreadMoreDescriptionText () {
  return (
    <>
      <Typography align='left' paragraph>
        Using classical computing we cannot always find the best solution
        to this problem in a reasonable time especially when the number of cities increases.
      </Typography>
      <Typography align='left' paragraph>
        On the other hand, using quantum annealing, we can solve this problem faster
        for a larger list of cities. The solution offered for this problem can be used
        for solving any other form of TSP like finding the shortest path a bee can take
        to visit all the flowers in the area for pollening or the shortest path a tourist
        can take to visit all the attractions of a city.
      </Typography>
    </>
  )
}
