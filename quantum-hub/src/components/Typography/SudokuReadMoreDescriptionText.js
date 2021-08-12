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
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Objective</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        The goal of this game is to demonstrate the flexibility of a Quantum
        Annealing computer by solving a classic puzzle, Sudoku.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        A Sudoku grid is a 9x9 grid split up into 9 3x3 blocks.
        Each cell in the Sudoku grid must contain <i>one and only one</i> digit from 1-9:
        <ul>
          <li><b>No</b> row may have duplicate digits</li>
          <li><b>No</b> column may have duplicate digits</li>
          <li><b>No</b> subgrid may have duplicate digits</li>
        </ul>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Instructions</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <ol>
          <li>
            Design your Sudoku: Click on the cells and type in your desired digit
            <br />
            You can also use the "Random" button for a random Sudoku puzzle
          </li>
          <li>Click "Solve" to send the puzzle to a quantum computer</li>
          <li>It will take some time to compute the solution</li>
          <li>If the Sudoku has a solution, one will be found and shown!</li>
        </ol>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        When you submit a problem to one of D-Wave's solvers, you are put in a queue. The time it
        takes to solve your Sudoku grid will depend on where you are in that queue.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Quantum Randomness</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        D-Wave's solvers are probabilistic, meaning that each run <i>might</i> result in a different
        solution. That is why problems are <i>sampled</i> many times, to make sure that the correct
        solution is identified. Well crafted Sudoku puzzles have <i>one</i> unique solution. In some
        cases, you can design a Sudoku puzzle such that there may be multiple possible solutions.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        For instance, what do you think will happen if you submit a blank grid to the solver? Try it
        out multiple times and see if you get the same answer each time!
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        <b>Problem Background</b>
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        This application uses a script from
        D-Wave's <Link href='https://github.com/dwave-examples/sudoku' style={{ color: '#1599bf' }}>gallery of examples</Link>.
        The Sudoku puzzle is modeled as a <i>constraint satisfaction problem</i>,
        or <Link href='https://en.wikipedia.org/wiki/Constraint_satisfaction#Constraint_satisfaction_problem' style={{ color: '#1599bf' }}>CSP</Link>.
        These are problems
        in mathematics where the solution is the state of a set of objects such that they satisfy certain
        constraints or limitations. For instance, in Sudoku, there are a number of requirements or constraints
        for a solution to be correct.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        CSPs allow for finding useful general-purpose algorithms that help tackle many everyday problems.
        The applications of CSPs range from solving logic puzzles and scheduling nurses on shifts to
        applications in artifical intelligence and building neural networks.
      </Typography>
      <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
        D-Wave's sudoku-solving script uses a hybrid
        solver, <Link href='https://docs.dwavesys.com/docs/latest/doc_leap_hybrid.html' style={{ color: '#1599bf' }}>Kerberos</Link>.
        Kerberos breaks problems down into smaller pieces and solves each on a quantum computer, before combining them to
        provide one final solution.
      </Typography>
    </>
  )
}
