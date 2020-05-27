// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './sudoku.css'
import XMLHttpRequest from 'xhr2'

import Button from '../../CustomButtons/Button'
import { makeSudokuGrid } from './GridSquare'

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
            sendForSolve(sudokuGrid, setSudokuGrid, setEnabled, props.outputToConsole, xhr, setXHR, props.getAPIKey, setEmpty)
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
 * @param {Array(81)} sudokuGrid - The current Sudoku grid
 * @param {Function} setSudokuGrid - The hook to set the Sudoku grid
 * @param {Array(2)} cur - The currently selected tile
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

    const boldRes = event.keyCode in [8, 48, 46, 96] ? 0 : 1
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

function isNumberPress (keyCode) {
  return (keyCode >= 48 && keyCode <= 57)
}

function isNumpadPress (keyCode) {
  return (keyCode >= 96 && keyCode <= 105)
}

function isArrowKeyPress (keyCode) {
  return (keyCode >= 37 && keyCode <= 40)
}

function updateEmptyState (state) {
  const gridState = isGridAllZeros(state.grid)
  state.setEmpty(gridState)
}

function isGridAllZeros (grid) {
  return grid.every(gridItem => gridItem === 0)
}

function flatten (coords) {
  return coords[0] + 9 * coords[1]
}

/**
 * This function does the XML HTTP request for the Sudoku Widget. It calls the
 * backend, and once the data is returned, postSolve is called. This handles
 * request creation, console logging, and some state validation.
 * @param {Array(81)} sudokuGrid - This is the current Sudoku GameState grid
 * @param {Function} setSudokuGrid - Hook to update Sudoku Grid
 * @param {Function} setEnabled - Hook to update Enabled status of the whole widget
 * @param {Function} outputToConsole - Hook to add a line of text to the Console (output)
 * @param {XMLHttpRequest} xhr - The current HTTP XML request. We only allow one at a
 * time for this widget, so the function only runs if it is null.
 * @param {Function} setXHR - Hook to update the current HTTP XML request.
 * @param {Function} getAPIKey - Returns the user's current API Key. If empty, assume
 * a simulation is wanted.
 * @param {Function} setEmpty - Hook to update the Sudoku Grid's empty state
 */
function sendForSolve (sudokuGrid, setSudokuGrid, setEnabled, outputToConsole, xhr, setXHR, getAPIKey, setEmpty) {
  if (xhr) return
  var sudokuArray = []
  for (var y = 0; y < 9; y++) {
    sudokuArray.push([])
    for (var x = 0; x < 9; x++) {
      sudokuArray[y].push(sudokuGrid[x + y * 9])
    }
  }
  setEnabled(false)
  outputToConsole('Sending in this grid:')
  sudokuArray.map((row) => outputToConsole(row.join(' ')))

  xhr = new XMLHttpRequest()
  const url = '/test_server'
  const params = {
    token: getAPIKey(),
    typeOfProblem: 'sudoku',
    sudokuArray: sudokuArray
  }
  const async = true
  xhr.open('POST', url, async)

  xhr.responseType = 'json'

  xhr.onload = () => {
    postSolve(setSudokuGrid, setEnabled, outputToConsole, xhr, setXHR, setEmpty)
  }
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(params))
  setXHR(xhr)
  outputToConsole('Solving...')
}

/**
 * postSolve is called after the call to the server is completed.
 * It should handle any errors, set the grid to a solved state if solved,
 * and report back to the user through the console.
 *
 * At the moment, it simply prints out the response text. This functionality
 * will be improved in later versions.
 * @param {Function} setSudokuGrid - Hook to update the Sudoku Grid.
 * @param {Function} setEnabled - Hook to update enabled status of widget.
 * @param {Function} outputToConsole - Output a line of text to the console.
 * @param {XMLHttpRequest} xhr - The widget's current XML Http Request.
 * @param {Function} setXHR - Hook to set xhr.
 */
function postSolve (setSudokuGrid, setEnabled, outputToConsole, xhr, setXHR, setEmpty) {
  setEnabled(true)

  if (xhr.response) {
    outputToConsole('Solved!')
    const solvedBoard = xhr.response.solved_board
    if (solvedBoard) {
      solvedBoard.map((row) => outputToConsole(row.join(' ')))
      const flattenedBoard = solvedBoard.flat()
      setSudokuGrid(flattenedBoard)
      setEmpty(isGridAllZeros(flattenedBoard))
    } else {
      outputToConsole(xhr.responseText)
    }
    outputToConsole(xhr.response.solution_message)
  } else {
    outputToConsole(xhr.statusText)
  }
  setXHR(null)
  xhr = null
}

function emptySudokuGrid (state) {
  if (!state.empty) {
    resetSudokuGrid(state.setGrid, state.setBold)
    state.setCur([0, 0])
    state.setEmpty(true)
  }
}

/**
 * Fills the Sudoku grid with 0s
 * Sets the grid state using setSudokuGrid
 * @param {Function} setSudokuGrid - Sets an external Sudoku Grid variable
 * @param {Function} setBold - Sets a grid variable indicating boldness of square
*/
function resetSudokuGrid (setSudokuGrid, setBold) {
  const newGrid = Array(81).fill(0)
  setSudokuGrid(newGrid)
  const newBold = Array(81).fill(false)
  setBold(newBold)
}

// Require the correct propTypes:
SudokuGame.propTypes = {
  id: PropTypes.string.isRequired,
  getAPIKey: PropTypes.func.isRequired,
  outputToConsole: PropTypes.func.isRequired
}

export default SudokuGame
