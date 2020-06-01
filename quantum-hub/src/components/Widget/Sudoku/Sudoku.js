// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './sudoku.css'
import sudokuSolveRequest from './sudokuSolveRequest'

import Button from '../../CustomButtons/Button'
import { makeSudokuGrid } from './GridSquare'
import {
  isNumberPress,
  isNumpadPress,
  isArrowKeyPress,
  updateEmptyState,
  // isGridAllZeros,
  flatten,
  emptySudokuGrid
  // resetSudokuGrid
} from './sudokuHelpers'

import { makeStyles } from '@material-ui/core/styles'
import styles from '../../../assets/jss/material-kit-react/components/sudokuStyle.js'

/**
 * SudokuGame is meant to make the Sudoku Solver tool
 * useable and accessible.
 *
 * Example Use::
 *
 *  const [APIKey, setAPIKey] = useState('')
 *  const [textLines, setTextLines] = useState([])
 *  return (
 *    <SudokuGame
 *      id='mySudoku'
 *      getAPIKey={() => APIKey}
 *      outputToConsole={(line) => {
 *        setTextLines(textLines.concat(line))
 *      }}
 *    />
 *  )
 *
 * Properties:
 * @prop {string} id - (Required) This will get extended to
 * serve as the id base string for all underlying components.
 * @prop {func()} getAPIKey - (Required) This needs
 * to be a function that can be called to return the current API
 * key.
 * NOTE: If it returns '', this is equivalent to choosing the
 * simulator.
 * @prop {func(string)} outputToConsole - (Required) This function
 * should take a single string (a line of text), and concatenate
 * it to the current console output string array. If the Console
 * is not being used, this can do anything you want with that
 * string, but you should probably output it in some way.
 */
function SudokuGame (props) {
  // The states for the Sudoku widget. These all use React hooks,
  // so that when setWhatever is called, the sudoku game is queued
  // for a rerender.
  const [sudokuGrid, setSudokuGrid] = useState(Array(81).fill(0))
  const [gridBold, setGridBold] = useState(Array(81).fill(0))
  const [currentSquare, setCurrentSquare] = useState([0, 0])
  const [enabled, setEnabled] = useState(true)
  const [empty, setEmpty] = useState(true)
  const [xhr, setXHR] = useState(null)

  var sudokuState = {
    grid: sudokuGrid,
    setGrid: setSudokuGrid,
    bold: gridBold,
    setBold: setGridBold,
    cur: currentSquare,
    setCur: setCurrentSquare,
    enabled: enabled,
    setEnabled: setEnabled,
    empty: empty,
    setEmpty: setEmpty,
    xhr: xhr,
    setXHR: setXHR
  }

  const useStyles = makeStyles(styles)

  const classes = useStyles()

  return (
    <div className={classes.sudokuRoot}>
      <div className='sudokuBox'>
        <div
          className='gridGrid'
          onKeyDown={(event) => {
            // Don't handle key presses if the whole app is disabled
            if (enabled) {
              handleKeyPress(
                event,
                sudokuState
              )
            }
          }}
        >
          {
            // Render each Sudoku square. They're tiled using CSS grid-template
            makeSudokuGrid(sudokuGrid, gridBold, [flatten(currentSquare)], enabled, setCurrentSquare)
          }
        </div>
      </div>
      <p>Click on the cells and use your keyboard numbers to fill them in!</p>
      <div className={classes.sudokuInput}>
        <Button
          color='geeringup' // Not a typo, this is the actual color
          disabled={!enabled}
          onClick={() => {
            sudokuSolveRequest(sudokuGrid, setSudokuGrid, setEnabled, props.outputToConsole, xhr, setXHR, props.getAPIKey, setEmpty)
          }}
        >
          Solve
        </Button>
        <Button
          disabled={(empty || !enabled)}
          onClick={() => {
            emptySudokuGrid(sudokuState)
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

/**
 * Handles key presses for the Sudoku Grid Component
 * Sets the number in the currently selected slot of the sudoku grid
 * to the number of the key just pressed.
 * @param {KeyPress} event - The keypres to be handled
 * @param {Object} state - The complete state of the Sudoku board
 */
function handleKeyPress (event, state) {
  console.log(`Key pressed is ${event.keyCode}`)
  const backspaces = [8, 46, 110]
  // 8 is backspace, the others are the numbers
  const x = state.cur[0]
  const y = state.cur[1]
  if (
    isNumberPress(event.keyCode) ||
    isNumpadPress(event.keyCode) ||
    backspaces.includes(event.keyCode)
  ) {
    event.preventDefault()
    // Copy grid state to new variables
    var newGrid = Array.from(state.grid)
    var newBold = Array.from(state.bold)
    var numRes
    if (backspaces.includes(event.keyCode)) numRes = 0
    else if (event.keyCode >= 96) numRes = event.keyCode - 96
    else numRes = event.keyCode - 48

    const boldRes = numRes !== 0
    newGrid[x + 9 * y] = numRes
    newBold[x + 9 * y] = boldRes

    state.setGrid(newGrid)
    /**
     * TODO: Temporary; solution for automatically updating state
     * object must be found
     */
    state.grid = newGrid
    state.setBold(newBold)

    updateEmptyState(state)
  } else if (isArrowKeyPress(event.keyCode)) {
    event.preventDefault()
    // Copy cur to newCur
    var newCur = Array.from(state.cur)
    switch (event.keyCode) {
      case 37: // Left
        newCur[0] = (x + 8) % 9
        break
      case 38: // Up
        newCur[1] = (y + 8) % 9
        break
      case 39: // Right
        newCur[0] = (x + 1) % 9
        break
      case 40: // Down
        newCur[1] = (y + 1) % 9
        break
      default:
        break
    }
    state.setCur(newCur)
  }
}

// Require the correct propTypes:
SudokuGame.propTypes = {
  id: PropTypes.string.isRequired,
  getAPIKey: PropTypes.func.isRequired,
  outputToConsole: PropTypes.func.isRequired
}

export default SudokuGame
