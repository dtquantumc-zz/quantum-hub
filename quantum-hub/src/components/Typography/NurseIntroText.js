// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'

export default function NurseIntroText () {
  return (
    <>
      <Typography align='left' paragraph variant='body1' color='geeringupSecondary' component='p'>
        This app schedules nurses to shifts using a quantum computer.
      </Typography>
    </>
  )
}
