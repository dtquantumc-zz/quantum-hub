// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'

export default function SudokuIntroText () {
  return (
    <>
      <Typography align='left' paragraph variant='body1' color='geeringupSecondary' component='p'>
        Sudoku is a logic-based, number-placement puzzle. To complete it, you must fill
        a 9x9 grid with single digits such that each column, row, and subgrid contain all
        of the digits from 1 to 9.
      </Typography>
    </>
  )
}
