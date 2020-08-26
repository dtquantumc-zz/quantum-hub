// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'

export default function TSPbriefDescriptionText () {
  return (
    <>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
            Imagine you are a salesperson, and you are planning to visit a list of cities
            and return to the city where you started.
            You care only about taking the shortest possible path.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
            The Travelling Salesperson Problem is to find the shortest path,
            having already determined the list of locations and the shortest path between any
            pair of cities.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
            Select the cities you want to visit, click "Solve", and then admire the graph in Full Screen.
      </Typography>
    </>
  )
}
