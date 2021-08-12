// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

export default function NurseReadMoreDescriptionText () {
  return (
    <>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Objective</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        The objective of this app is to create a nurse work schedule so that:
        <ol>
          <li>No nurse works two or more days in a row</li>
          <li>There are exactly enough nurses working each day</li>
          <li>All nurses should have roughly even work schedules</li>
        </ol>
        If such a perfect schedule is impossible, nurses may be scheduled to work
        twice or more in a row, and there may be understaffing.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Instructions</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <ol>
          <li>Input the problem contraints you want</li>
          <li>Click "Solve" to solve on a quantum computer</li>
          <li>There may be a delay while waiting for an available computer</li>
          <li>The compact schedule is then shown in a calendar</li>
          <li>Click "More Detail" to see a complete schedule in a grid</li>
        </ol>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Quantum Randomness</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        D-Wave's quantum annealer is probabilistic, and as such, you may get a
        different solution every time you click "Solve". Try solving multiple
        times to see if you get different answers!
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Problem Background</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        This application uses D-Wave System's Nurse
        Scheduling <Link href='https://github.com/dwave-examples/nurse-scheduling' style={{ color: '#1599bf' }}>Toy Example code</Link>.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        Similar to the Sudoku puzzle, Nurse Scheduling is a constraint satisfactory
        problem (CSP).
        There are a given set of constraints that an ideal solution must follow. We
        run this problem on D-Wave System's Quantum Processing Unit (QPU).
      </Typography>
    </>
  )
}
