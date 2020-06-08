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
import CircularProgress from '@material-ui/core/CircularProgress'

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
 *      appendToConsole={}
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
 * @prop {func(string)} appendToConsole - (Required) Same as output,
 * but just appends
 * the given string to the last line of the Console.
 */
function SudokuGame (props) {
  // The states for the Sudoku widget. These all use React hooks,
  // so that when setWhatever is called, the sudoku game is queued
  // for a rerender.
  const [sudokuGrid, setSudokuGrid] = useState(Array(81).fill(0))
  const [gridBold, setGridBold] = useState(Array(81).fill(0))

  const [gridInvalid, setGridInvalid] = useState(getEmptyGrid())
  const [rowInvalid, setRowInvalid] = useState(getEmptyRow())
  const [colnInvalid, setColnInvalid] = useState(getEmptyColn())
  const [blockInvalid, setBlockInvalid] = useState({})

  const [currentSquare, setCurrentSquare] = useState([0, 0])
  const [enabled, setEnabled] = useState(true)
  const [empty, setEmpty] = useState(true)
  const [loading, setLoading] = useState(false)

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
    loading: loading,
    setLoading: setLoading
  }

  const invalidStateSetters = {
    setGridInvalid: setGridInvalid,
    setRowInvalid: setRowInvalid,
    setColnInvalid: setColnInvalid,
    setBlockInvalid: setBlockInvalid
  }

  const useStyles = makeStyles(styles)

  const classes = useStyles()

  return (
    <div className={classes.sudokuRoot}>
      <div className={loading ? 'sudokuBox loading' : 'sudokuBox'}>
        <div
          className='gridGrid'
          onKeyDown={(event) => {
            // Don't handle key presses if the whole app is disabled
            if (enabled) {
              handleKeyPress(
                event,
                sudokuState,
                validateKeyPress.bind(this, invalidStateSetters)
              )
            }
          }}
        >
          {
            // Render each Sudoku square. They're tiled using CSS grid-template
            makeSudokuGrid(sudokuGrid, gridBold, [flatten(currentSquare)], enabled, setCurrentSquare, gridInvalid, rowInvalid, colnInvalid, blockInvalid)
          }
        </div>
        {loading && <CircularProgress size={68} className={classes.sudokuProgress} />}
      </div>
      <p>Click on the cells and use your keyboard numbers to fill them in!</p>
      <div className={classes.sudokuInput}>
        <Button
          color='geeringupSecondary'
          disabled={!enabled}
          onClick={() => {
            // TODO: Consider setting it to nothing instead of top-left
            setCurrentSquare([0, 0])
            sudokuSolveRequest(sudokuGrid, setSudokuGrid, setEnabled,
              props.outputToConsole, props.appendToConsole, props.getAPIKey, setEmpty,
              setLoading, resetInvalidStates.bind(this, invalidStateSetters))
          }}
        >
          Solve
        </Button>
        <Button
          color='geeringupPrimary'
          // color='primary'
          disabled={(empty || !enabled)}
          onClick={() => {
            emptySudokuGrid(sudokuState)
            resetInvalidStates(invalidStateSetters)
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

function isValidSudokuGrid (sudokuValidationResults) {
  return areRowsValid(sudokuValidationResults) &&
  areColnsValid(sudokuValidationResults) &&
  areBlocksValid(sudokuValidationResults)
}

function areRowsValid (sudokuValidationResults) {
  return isEmptyObject(sudokuValidationResults.duplicatesInRow)
}

function areColnsValid (sudokuValidationResults) {
  return isEmptyObject(sudokuValidationResults.duplicatesInColn)
}

function areBlocksValid (sudokuValidationResults) {
  return isEmptyObject(sudokuValidationResults.duplicatesInBlock)
}

function isEmptyObject (object) {
  return isKeyLengthZero(object) &&
    isObjectConstructor(object)
}

function isKeyLengthZero (object) {
  return Object.keys(object).length === 0
}

function isObjectConstructor (object) {
  return object.constructor === Object
}

function validateKeyPress (setters, sudokuGrid) {
  const sudokuValidationResults = getSudokuValidationResults(sudokuGrid)

  if (isValidSudokuGrid(sudokuValidationResults)) {
    resetInvalidStates(setters)
  } else {
    updateInvalidStates(setters, sudokuValidationResults)
  }
}

function getSudokuValidationResults (sudokuGrid) {
  const N = 9
  const M = 9

  let seenInRow = {}
  let seenInColn = {}
  let seenInBlock = {}

  const sudokuBoard = getUnflattenedSudokuBoard(sudokuGrid)

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      const current = sudokuBoard[i][j]

      if (current === 0) {
        continue
      }

      const inRow = current + ' in row ' + i
      const inColn = current + ' in coln ' + j

      const blockRow = Math.floor(i / 3)
      const blockColumn = Math.floor(j / 3)
      const inBlock = current + ' in block ' + blockRow + ' - ' + blockColumn

      seenInRow = addKeyValToObject(inRow, [i, j], seenInRow)
      seenInColn = addKeyValToObject(inColn, [i, j], seenInColn)
      seenInBlock = addKeyValToObject(inBlock, [i, j], seenInBlock)
    }
  }

  const validationResult = {
    duplicatesInRow: getDuplicatesInRow(seenInRow),
    duplicatesInColn: getDuplicatesInColn(seenInColn),
    duplicatesInBlock: getDuplicatesInBlock(seenInBlock)
  }

  return validationResult
}

function getDuplicatesInRow (seenInRow) {
  let duplicatesInRow = {}

  Object.keys(seenInRow).forEach(row => {
    if (hasDuplicates(seenInRow, row)) {
      seenInRow[row].forEach((coord) => {
        duplicatesInRow = addKeyValToObject(coord[0], coord[1], duplicatesInRow)
      })
    }
  })

  return duplicatesInRow
}

function getDuplicatesInColn (seenInColn) {
  let duplicatesInColn = {}

  Object.keys(seenInColn).forEach(coln => {
    if (hasDuplicates(seenInColn, coln)) {
      seenInColn[coln].forEach((coord) => {
        duplicatesInColn = addKeyValToObject(coord[1], coord[0], duplicatesInColn)
      })
    }
  })

  return duplicatesInColn
}

function getDuplicatesInBlock (seenInBlock) {
  let duplicatesInBlock = {}

  Object.keys(seenInBlock).forEach(block => {
    if (hasDuplicates(seenInBlock, block)) {
      seenInBlock[block].forEach((coord) => {
        const key = [Math.floor(coord[0] / 3), Math.floor(coord[1] / 3)]
        duplicatesInBlock = addKeyValToObject(key, coord, duplicatesInBlock)
      })
    }
  })

  return duplicatesInBlock
}

function hasDuplicates (object, key) {
  return object[key].length > 1
}

function getUnflattenedSudokuBoard (flattenedSudokuBoard) {
  const unflattenedSudokuBoard = []
  let row = []

  for (let i = 0; i < flattenedSudokuBoard.length; i++) {
    row.push(flattenedSudokuBoard[i])

    if (isRowFilled(i)) {
      unflattenedSudokuBoard.push(row)
      row = []
    }
  }

  return unflattenedSudokuBoard
}

function isRowFilled (lastFilledIndex) {
  return (lastFilledIndex + 1) % 9 === 0
}

function addKeyValToObject (key, val, object) {
  if (!object[key]) {
    object[key] = [val]
  } else {
    object[key].push(val)
  }

  return object
}

function updateInvalidStates (setters, sudokuValidationResults) {
  let newGridInvalid = getEmptyGrid()
  newGridInvalid = handleInvalidRow(sudokuValidationResults, newGridInvalid, setters)
  newGridInvalid = handleInvalidColn(sudokuValidationResults, newGridInvalid, setters)
  newGridInvalid = handleInvalidBlock(sudokuValidationResults, newGridInvalid, setters)

  setters.setGridInvalid(newGridInvalid)
}

function handleInvalidRow (sudokuValidationResults, gridInvalid, setters) {
  if (areRowsValid(sudokuValidationResults)) {
    resetRowInvalid(setters)
  } else {
    const duplicatesInRow = sudokuValidationResults.duplicatesInRow
    setters.setRowInvalid(duplicatesInRow)
    gridInvalid = updateInvalidRowCoordinatesInGrid(duplicatesInRow, gridInvalid)
  }

  return gridInvalid
}

function updateInvalidRowCoordinatesInGrid (duplicatesInRow, gridInvalid) {
  Object.keys(duplicatesInRow).forEach(row => {
    const columns = duplicatesInRow[row]
    columns.forEach(column => {
      gridInvalid[row][column] = true
    })
  })

  return gridInvalid
}

function handleInvalidColn (sudokuValidationResults, gridInvalid, setters) {
  if (areColnsValid(sudokuValidationResults)) {
    resetColnInvalid(setters)
  } else {
    const duplicatesInColn = sudokuValidationResults.duplicatesInColn
    setters.setColnInvalid(duplicatesInColn)
    gridInvalid = updateInvalidColnCoordinatesInGrid(duplicatesInColn, gridInvalid)
  }

  return gridInvalid
}

function updateInvalidColnCoordinatesInGrid (duplicatesInColn, gridInvalid) {
  Object.keys(duplicatesInColn).forEach(column => {
    const rows = duplicatesInColn[column]
    rows.forEach(row => {
      gridInvalid[row][column] = true
    })
  })

  return gridInvalid
}

function handleInvalidBlock (sudokuValidationResults, gridInvalid, setters) {
  if (areBlocksValid(sudokuValidationResults)) {
    resetBlockInvalid(setters)
  } else {
    const duplicatesInBlock = sudokuValidationResults.duplicatesInBlock
    setters.setBlockInvalid(duplicatesInBlock)
    gridInvalid = updateInvalidBlockCoordinatesInGrid(duplicatesInBlock, gridInvalid)
  }

  return gridInvalid
}

function updateInvalidBlockCoordinatesInGrid (duplicatesInBlock, gridInvalid) {
  Object.keys(duplicatesInBlock).forEach(block => {
    const coords = duplicatesInBlock[block]
    coords.forEach(coord => {
      gridInvalid[coord[0]][coord[1]] = true
    })
  })

  return gridInvalid
}

function getEmptyGrid () {
  return getEmptyColn().map(() => getEmptyRow())
}

function getEmptyColn () {
  return Array(9).fill(0)
}

function getEmptyRow () {
  return Array(9).fill(0)
}

function getEmptyBlock () {
  return {}
}

function resetInvalidStates (setters) {
  resetGridInvalid(setters)
  resetRowInvalid(setters)
  resetColnInvalid(setters)
  resetBlockInvalid(setters)
}

function resetGridInvalid (setters) {
  setters.setGridInvalid(getEmptyGrid())
}

function resetRowInvalid (setters) {
  setters.setRowInvalid(getEmptyRow())
}

function resetColnInvalid (setters) {
  setters.setColnInvalid(getEmptyColn())
}

function resetBlockInvalid (setters) {
  setters.setBlockInvalid(getEmptyBlock())
}

/**
 * Handles key presses for the Sudoku Grid Component
 * Sets the number in the currently selected slot of the sudoku grid
 * to the number of the key just pressed.
 * @param {KeyPress} event - The keypres to be handled
 * @param {Object} state - The complete state of the Sudoku board
 * @param {Function} keyPressValidator - The validator that
 * will be called to check the Sudoku board state and validities
 * after any board change
 */
function handleKeyPress (event, state, keyPressValidator) {
  // console.log(`Key pressed is ${event.keyCode}`)
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

  keyPressValidator(state.grid)
}

// Require the correct propTypes:
SudokuGame.propTypes = {
  id: PropTypes.string.isRequired,
  getAPIKey: PropTypes.func.isRequired,
  outputToConsole: PropTypes.func.isRequired
}

export default SudokuGame
