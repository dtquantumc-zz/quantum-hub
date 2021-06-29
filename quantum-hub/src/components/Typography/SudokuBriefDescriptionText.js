// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'

export default function SudokuBriefDescriptionText () {
  return (
    <>
      <Typography align='left' paragraph variant='body1' color='textSecondary' component='p'>
        While this puzzle can be solved on a <i>classical</i> computer, let's try solving
        it on a <i>quantum annealer</i>. In particular, we will be using D-Wave System's 2000Q
        Quantum Processing Unit.
      </Typography>
    </>
  )
}
