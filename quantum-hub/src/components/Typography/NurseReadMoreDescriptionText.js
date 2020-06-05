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
      <Typography align='left' paragraph>
        Nurses are assigned according to the following constraints:
        <ol>
          <li>No nurse must work two or more days in a row (hard constraint)</li>
          <li>At least one nurse must be assigned for each working day (hard constraint)</li>
          <li>All nurses should have roughly even work schedules (soft constraint)</li>
        </ol>
      </Typography>
      <Typography align='left' paragraph>
        Hard constraints tell the program that they <b>must</b> be met.
        Soft constraints tell the program to promote solutions that meet them.
      </Typography>
      <Typography align='left' paragraph>
        The program tries to find the <i>optimum</i> solution here, meaning
        that not every solution will meet all three constraints well, it is
        looking for the best solution possible.
      </Typography>
      <Typography align='left' paragraph>
        Enter the number of nurses you'd like to schedule, and the number of days
        you'd like to schedule shifts on. Kindly note that when you submit your problem,
        it will be put in two queues. The first is a queue on this web application,
        where we solve problems based on when they are submitted. The second queue your
        problem will have to wait in is D-Wave's Quantum Processor Unit, or QPU. It's
        unlikely that you'll be waiting in queue for a very long time, it really depends
        on how many users there are at any given time!
      </Typography>
      <Typography align='left' paragraph>
        This application uses D-Wave System's Nurse Scheduling Toy Example code,
        found <Link href='https://github.com/dwave-examples/nurse-scheduling' style={{ color: '#1599bf' }}>here</Link>.
      </Typography>
      <Typography align='left' paragraph>
        Similar to the Sudoku puzzle, the NSP is a constraint satisfactory problem (CSP).
        There are a given set of constraints that an ideal solution must follow. We
        run this problem on D-Wave System's Quantum Processing Unit (QPU).
      </Typography>
      <Typography align='left' paragraph>
        D-Wave's solvers are probabilistic, and as such, you may get a different solution
        every time you click 'Solve'.
      </Typography>
    </>
  )
}
