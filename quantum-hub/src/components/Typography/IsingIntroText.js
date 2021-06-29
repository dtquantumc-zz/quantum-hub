// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'

export default function IsingIntroText () {
  return (
    <>
      <Typography align='left' paragraph variant='body1' color='geeringupSecondary' component='p'>
            This is a graphical representation of the Ising Model of a qubit and the annealing
            process as used in Dwave's quantum annealer.
      </Typography>
    </>
  )
}