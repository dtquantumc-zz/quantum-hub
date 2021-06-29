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
      <Typography align='left' paragraph variant='body1' color='textSecondary' component='p'>
        To play, you design your own grid or use a randomly generated one.
        After "locking in" your grid, try to minimize neighbouring nodes
        with the same colour!
      </Typography>
      <Typography align='left' paragraph variant='body1' color='textSecondary' component='p'>
        After trying to optimize your own grid, you can then give the layout
        to D-wave's quantum computer, which will run this optimization problem
        50 times on its quantum computer and return the best result.
      </Typography>
    </>
  )
}
