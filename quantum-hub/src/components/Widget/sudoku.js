// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './sudoku.css'
import XMLHttpRequest from 'xhr2'

import Button from '../CustomButtons/Button'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../assets/jss/material-kit-react/views/app.js'

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
  const [currentSquare, setCurrentSquare] = useState([0, 0])
  const [enabled, setEnabled] = useState(true)
  const [xhr, setXHR] = useState(null)

  const useStyles = makeStyles(styles)

  const classes = useStyles()

  return (
    <div>
      <div className='sudokuBox'>
        <div
          className='gridGrid'
          onKeyPress={(event) => {
            // Don't handle key presses if the whole app is disabled
            if (enabled) handleKeyPress(event, sudokuGrid, setSudokuGrid, currentSquare)
          }}
        >
          {
            // Render each Sudoku square. They're tiled using CSS grid-template
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((y) => {
              return [0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => {
                return (
                  <GridSquare
                    x={x}
                    y={y}
                    key={x + 9 * y} // Keys should be unique for React rendered components on the same layer
                    value={sudokuGrid[x + 9 * y]}
                    enabled={enabled}
                    onClick={() => setCurrentSquare([x, y])}
                    focused={(currentSquare[0] === x && currentSquare[1] === y)}
                  />
                )
              })
            })
          }
        </div>
      </div>
      <p>Click on the cells and use your keyboard numbers to fill them in!</p>
      <div className={classes.sudokuInput}>
        <Button
          color='geeringup' // Not a typo, this is the actual color
          disabled={!enabled}
          onClick={() => {
            sendForSolve(sudokuGrid, setSudokuGrid, setEnabled, props.outputToConsole, xhr, setXHR, props.getAPIKey)
          }}
        >
          Solve
        </Button>
      </div>
    </div>
  )
}

/**
 * Draws a singular sudoku square, like you see 81 of in the whole 9x9 grid.
 * Uses its x and y props to decide which of its grid borders should be bolded
 * and how bold they should be. This is what gives the board its Sudoku look.
 * @prop {Integer} x - The x position of the Square in its grid
 * @prop {Integer} y - The y position of the Square in its grid
 * @prop {Boolean} focused - Marks whether the square should be in focus
 * @prop {Function} onClick - Function to be called on button click
 * @prop {Integer} value - What will be displayed in the Square
 * @prop {Boolean} enabled - Whether the button should be enabled
 */
function GridSquare (props) {
  var classes = 'gridSquare'
  if (props.x === 0) classes += ' gridLeftest'
  else if (props.x % 3 === 0) classes += ' gridLeft'

  if (props.x === 8) classes += ' gridRightest'
  else if (props.x % 3 === 2) classes += ' gridRight'

  if (props.y === 0) classes += ' gridToppest'
  else if (props.y % 3 === 0) classes += ' gridTop'

  if (props.y === 8) classes += ' gridBottomest'
  else if (props.y % 3 === 2) classes += ' gridBottom'
  if (props.focused) classes += ' focused'

  return (
    <button
      type='button'
      className={classes}
      onClick={props.onClick}
      disabled={!props.enabled}
    >
      {props.value === 0 ? '' : String(props.value)}
    </button>
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
function handleKeyPress (event, sudokuGrid, setSudokuGrid, cur) {
  if (event.charCode >= 48 && event.charCode <= 57) {
    var newGrid = Array(81).fill(0)

    for (var x = 0; x < 9; ++x) {
      for (var y = 0; y < 9; ++y) {
        if (cur[0] === x && cur[1] === y) {
          newGrid[x + 9 * y] = event.charCode - 48
        } else {
          newGrid[x + 9 * y] = sudokuGrid[x + 9 * y]
        }
      }
    }
    setSudokuGrid(newGrid)
  }
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
 */
function sendForSolve (sudokuGrid, setSudokuGrid, setEnabled, outputToConsole, xhr, setXHR, getAPIKey) {
  if (xhr) return
  var sudokuArray = []
  for (var y = 0; y < 9; y++) {
    sudokuArray.push([])
    for (var x = 0; x < 9; x++) {
      sudokuArray[y].push(sudokuGrid[x + y * 9])
    }
  }
  setEnabled(false)
  outputToConsole('Sending this grid in for solving:')
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
    postSolve(setSudokuGrid, setEnabled, outputToConsole, xhr, setXHR)
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
function postSolve (setSudokuGrid, setEnabled, outputToConsole, xhr, setXHR) {
  setEnabled(true)

  if (xhr.response) {
    outputToConsole('Solved!')
    const solvedBoard = xhr.response.solved_board
    if (solvedBoard) {
      solvedBoard.map((row) => outputToConsole(row.join(' ')))
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

/**
 * Fills the Sudoku grid with 0s
 * Sets the grid state using setSudokuGrid
 * @param {Function} setSudokuGrid - Sets an external Sudoku Grid variable
*/
// function resetSudokuGrid (setSudokuGrid) {
//   var newGrid = Array(9).fill(Array(9).fill(0))
//   setSudokuGrid(newGrid)
// }

// Require the correct propTypes:
SudokuGame.propTypes = {
  id: PropTypes.string.isRequired,
  getAPIKey: PropTypes.func.isRequired,
  outputToConsole: PropTypes.func.isRequired
}

export default SudokuGame
