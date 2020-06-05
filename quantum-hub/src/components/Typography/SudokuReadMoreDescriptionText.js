// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

export default function SudokuReadMoreDescriptionText () {
  return (
    <>
      <Typography align='left' paragraph>
        Select a cell on the Sudoku grid. Type in your desired digit. After entering the puzzle,
        press the 'Solve' button below.
      </Typography>
      <Typography align='left' paragraph>
        When you submit a problem to one of D-Wave's solvers, you are put in a queue. The time it
        takes to solve your Sudoku grid will depend on where you are in that queue.
      </Typography>
      <Typography align='left' paragraph>
        D-Wave's solvers are probabilistic, meaning that each run <i>might</i> result in a different
        solution. That is why problems are <i>sampled</i> many times, to make sure that the correct
        solution is identified. Well crafted Sudoku puzzles have <i>one</i> unique solution. In some
        cases, you can design a Sudoku puzzle such that there may be multiple possible solutions.
      </Typography>
      <Typography align='left' paragraph>
        For instance, what do you think will happen if you submit a blank grid to the solver? Try it
        out multiple times and see if you get the same answer each time!
      </Typography>
      <Typography align='left' paragraph>
        This application uses a script from D-Wave's gallery of examples
        linked <Link href='https://github.com/dwave-examples/sudoku' style={{ color: '#1599bf' }}>here</Link>.
        The Sudoku puzzle is modeled as a <i>constraint satisfaction problem</i>, or CSP. These are problems
        in mathematics where the solution is the state of a set of objects such that they satisfy certain
        constraints or limitations. For instance, in Sudoku, there are a number of requirements or constraints
        for a solution to be correct.
      </Typography>
      <Typography align='left' paragraph>
        Each cell in the Sudoku puzzle must contain <i>one and only one</i> digit
        <ul>
          <li><b>No</b> row may have duplicate digits</li>
          <li><b>No</b> column may have duplicate digits</li>
          <li><b>No</b> subgrid may have duplicate digits</li>
        </ul>
      </Typography>
      <Typography align='left' paragraph>
        CSPs allow for finding useful general-purpose algorithms that help tackle many everyday problems.
        The applications of CSPs range from solving logic puzzles and scheduling nurses on shifts to
        applications in artifical intelligence and building neural networks.
      </Typography>
      <Typography align='left' paragraph>
        D-Wave's sudoku-solving script uses a hybrid
        solver, <Link href='https://docs.dwavesys.com/docs/latest/doc_leap_hybrid.html' style={{ color: '#1599bf' }}>Kerberos</Link>.
        Kerberos breaks problems down into smaller pieces and solves each on a quantum computer, before combining them to
        provide one final solution.
      </Typography>
    </>
  )
}
