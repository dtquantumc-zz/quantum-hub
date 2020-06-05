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
        Welcome to the Nurse Scheduling Problem, or the NSP.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        This application assigns a set of nurses to a number of shifts,
        based on a set of constraints on schedule and staff.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        This is a <i>simplified</i> model of a nursing facility.
        In real facilities, the constraints may differ and may be somewhat more complicated,
        to ensure that there are enough nurses on shifts at all times, without overworking
        any individual nursing staff.
      </Typography>
    </>
  )
}
