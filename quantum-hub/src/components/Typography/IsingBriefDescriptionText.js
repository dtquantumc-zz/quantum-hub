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
            Imagine you are a salesperson who is planning to visit a list of cities and wants to do this in the
            shortest time possible by taking the shortest possible path.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
            Having the list of cities and distances between each pair, find the shortest path.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
            This is the original form of the “Travelling Salesperson Problem”(TSP) but this can be
            generalized to many other forms.
      </Typography>
    </>
  )
}
