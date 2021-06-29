// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'

export default function LatticeIntroText () {
  return (
    <>
      <Typography align='left' paragraph variant='body1' color='geeringupSecondary' component='p'>
        This is a two-colouring problem on a hexagonal lattice. With only two colours, make the fewest possible neighbours share the same colour.
      </Typography>
    </>
  )
}
