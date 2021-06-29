// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'

export default function TSPIntroText () {
  return (
    <>
      <Typography align='left' paragraph variant='body1' color='geeringupSecondary' component='p'>
            Imagine you are a salesperson, and you are planning to visit a list of cities
            and return to the city where you started.
            You care only about taking the shortest possible path.
      </Typography>
    </>
  )
}
