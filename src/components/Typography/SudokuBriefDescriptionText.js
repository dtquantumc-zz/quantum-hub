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
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        Sudoku is a logic-based, number-placement puzzle. To complete it, you must fill
        a 9x9 grid with single digits such that each column, row, and subgrid contain all
        of the digits from 1 to 9.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        While this puzzle can be solved on a <i>classical</i> computer, let's try solving
        it on a <i>quantum annealer</i>. In particular, we will be using D-Wave System's 2000Q
        Quantum Processing Unit.
      </Typography>
    </>
  )
}
