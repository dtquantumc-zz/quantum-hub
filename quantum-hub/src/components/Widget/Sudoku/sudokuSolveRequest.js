// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

// import XMLHttpRequest from 'xhr2'
import makeLongRequest from '../LongRequest'
import sudokuVars from './SudokuVariables'
import {
  isGridAllZeros
} from './sudokuHelpers'

/**
 * This function does the XML HTTP request for the Sudoku Widget. It calls the
 * backend, and once the data is returned, postSolve is called. This handles
 * request creation, console logging, and some state validation.
 * @param {Array(81)} sudokuGrid - This is the current Sudoku GameState grid
 * @param {Function} setSudokuGrid - Hook to update Sudoku Grid
 * @param {Function} setEnabled - Hook to update Enabled status of the whole widget
 * @param {Function} outputToConsole - Hook to add a line of text to the Console (output)
 * @param {Function} getAPIKey - Returns the user's current API Key. If empty, assume
 * a simulation is wanted.
 * @param {Function} setEmpty - Hook to update the Sudoku Grid's empty state
 * @param {Function} setLoading - Hook to update the Sudoku Grid's loading state
 * @param {Function} resetInvalidStates - Helper function to reset all of the
 * Sudoku Grid's invalid states
 */
function sudokuSolveRequest (sudokuGrid, setSudokuGrid, setEnabled, outputToConsole, appendToConsole, getAPIKey, setEmpty, setLoading, resetInvalidStates) {
  if (sudokuVars.xhr) return
  var sudokuArray = []
  for (var y = 0; y < 9; y++) {
    sudokuArray.push([])
    for (var x = 0; x < 9; x++) {
      sudokuArray[y].push(sudokuGrid[x + y * 9])
    }
  }
  setEnabled(false)
  setLoading(true)
  outputToConsole('Sending in this grid:')
  sudokuArray.map((row) => outputToConsole(row.join(' ')))

  // sudokuVars.xhr = new XMLHttpRequest()
  // var xhr = sudokuVars.xhr
  // const url = '/qpu_request'
  const params = {
    // token: getAPIKey(),
    typeOfProblem: 'sudokuSolving',
    sudokuArray: sudokuArray
  }
  // const async = true
  // xhr.open('POST', url, async)

  // xhr.responseType = 'json'

  // xhr.onload = () => {
  //   postSolve(setSudokuGrid, setEnabled, outputToConsole, setEmpty, setLoading)
  // }
  // xhr.setRequestHeader('Content-type', 'application/json')
  // xhr.send(JSON.stringify(params))

  makeLongRequest(
    params,
    (xhr) => {
      outputToConsole('The sudoku has been queued for solving!')
      sudokuVars.setState(xhr.response.jobStatus)
    },
    (xhr) => {
      if (xhr.response.jobStatus === sudokuVars.state) {
        appendToConsole('.')
      } else if (xhr.response.jobStatus === 'queued') {
        outputToConsole('In Queue')
      } else if (xhr.response.jobStatus === 'started') {
        outputToConsole('Solving')
      } else {
        outputToConsole(xhr.response.jobStatus)
      }
      sudokuVars.setState(xhr.response.jobStatus)
    },
    (xhr) => {
      postSolve(xhr, setSudokuGrid, setEnabled, outputToConsole, setEmpty, setLoading, resetInvalidStates)
    },
    (xhr) => {
      outputToConsole('Something went wrong')
      console.log(xhr)
      outputToConsole(JSON.stringify(xhr))
    },
    outputToConsole
  )

  // setXHR(xhr)
  // outputToConsole('Solving...')
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
 * @param {Function} setEmpty - Hook to update the Sudoku Grid's empty state
 * @param {Function} setLoading - Hook to update the Sudoku Grid's loading state
 * @param {Function} resetInvalidStates - Helper function to reset all of the
 * Sudoku Grid's invalid states
 */
function postSolve (xhr, setSudokuGrid, setEnabled, outputToConsole, setEmpty, setLoading, resetInvalidStates) {
  // const xhr = sudokuVars.xhr

  setEnabled(true)
  setLoading(false)
  resetInvalidStates()

  if (xhr.status === 200) {
    outputToConsole('Solved!')
    const solvedBoard = xhr.response.solved_board
    if (solvedBoard) {
      solvedBoard.map((row) => outputToConsole(row.join(' ')))
      const flattenedBoard = solvedBoard.flat()
      setSudokuGrid(flattenedBoard)
      setEmpty(isGridAllZeros(flattenedBoard))
    } else {
      outputToConsole(JSON.stringify(xhr.response))
    }
    outputToConsole(xhr.response.solution_message)
    // outputToConsole(xhr.response.timing.stringify())
  } else if (xhr.status === 400) {
    outputToConsole(xhr.response.error)
  } else {
    outputToConsole(xhr.status, xhr.statusText)
    outputToConsole('Your Sudoku may have been too difficult and timed out.')
    outputToConsole('Please save the Sudoku you were trying to solve and report the problem')
  }
  sudokuVars.setXHR(null)
}

export default sudokuSolveRequest
