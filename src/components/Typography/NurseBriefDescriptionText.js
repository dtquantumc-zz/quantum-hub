// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'

export default function NurseBriefDescriptionText () {
  return (
    <>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        This app schedules nurses to shifts using a quantum computer.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        A schedule will be found to assign nurses to shifts so that nurses work
        similar amounts, no nurse works twice in a row, and there are enough nurses
        per day to take care of patients.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        This is a <i>simplified</i> model of a nursing facility.
        In real facilities, the constraints may differ and may be somewhat more complicated,
        to accomodate with changing demand and nurses' availability schedules.
      </Typography>
    </>
  )
}
