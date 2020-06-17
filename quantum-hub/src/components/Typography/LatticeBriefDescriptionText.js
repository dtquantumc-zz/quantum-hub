// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'

export default function LatticeBriefDescriptionText () {
  return (
    <>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        This is a two-colouring problem on a hexagonal lattice.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        You can design your own grid, where
        each hexagon is a graph node, connected to its neighbours.
        Then, after "locking in"
        the grid, your goal is to colour the nodes with two colours so as
        to minimize neighbouring nodes with the same colour.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        After trying to optimize your own grid, you can then give the layout
        to D-wave's quantum computer, which will run this optimization problem
        50 times on its quantum computer and return the best result.
      </Typography>
    </>
  )
}
