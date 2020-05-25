// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './component_css/sudoku.css'
import XMLHttpRequest from 'xhr2'

import Button from '../components/CustomButtons/Button'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../assets/jss/material-kit-react/views/app.js'

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
  const [sudokuGrid, setSudokuGrid] = useState(Array(81).fill(0))
  const [currentSquare, setCurrentSquare] = useState([0, 0])
  const [enabled, setEnabled] = useState(true)
  const [xhr, setXHR] = useState(null)

  if (sudokuGrid.length === 0) {
    resetSudokuGrid(setSudokuGrid)
  }

  const useStyles = makeStyles(styles)

  const classes = useStyles()

  return (
    <div>
      <div className='sudokuBox'>
        <div
          className='gridGrid'
          onKeyPress={(event) => {
            if (enabled) handleKeyPress(event, sudokuGrid, setSudokuGrid, currentSquare)
          }}
        >
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((y) => {
              return [0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => {
                // console.log('rendering')
                return (
                  <GridSquare
                    x={x}
                    y={y}
                    key={x + 9 * y}
                    value={sudokuGrid[x + 9 * y]}
                    enabled={enabled}
                    onClick={() => setCurrentSquare([x, y])}
                    focused={(currentSquare[0] === x && currentSquare[1] === y)}
                  />
                )
                // return <button key={x + 9 * y} className='gridSquare'>a</button>
              })
            })
          }
        </div>
      </div>
      <p>Click on the cells and use your keyboard numbers to fill them in!</p>
      <div className={classes.sudokuInput}>
        <Button
          color='greeingup'
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
  xhr.onload = () => {
    postSolve(setSudokuGrid, setEnabled, outputToConsole, xhr, setXHR)
  }
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(params))
  setXHR(xhr)
  outputToConsole('Solving...')
}

function postSolve (setSudokuGrid, setEnabled, outputToConsole, xhr, setXHR) {
  setEnabled(true)
  outputToConsole('Solved!')
  outputToConsole(xhr.responseText)
  setXHR(null)
  xhr = null
}

/**
 * Fills the Sudoku grid with 0s
 * Sets the grid state using setSudokuGrid
 * @param {Function} setSudokuGrid - Sets an external Sudoku Grid variable
*/
function resetSudokuGrid (setSudokuGrid) {
  var newGrid = Array(9).fill(Array(9).fill(0))
  setSudokuGrid(newGrid)
}

// class SudokuGame extends React.Component {
//   static propTypes = {
//     id: PropTypes.string.isRequired,
//     getAPIKey: PropTypes.func.isRequired,
//     outputToConsole: PropTypes.func.isRequired
//   }

//   constructor (props) {
//     super(props)
//     this.state = {
//       status: 'idle'
//     }
//   }

//   /**
//    * An example of a call to solve the widget puzzle
//    */
//   async callSolver () {
//     if (this.state.status === 'waiting...') return
//     const APIKey = this.props.getAPIKey()
//     const consoleMsg = 'Making a call using the ' + (APIKey === '' ? 'simulator' : 'QPU')
//     this.props.outputToConsole(consoleMsg)

//     /* Example async call */
//     this.pseudoHash(APIKey).then((result) => { this.resolveSolve(result) })
//     /* This could be a fetch() call, or a classical solver, or anything in between */
//     this.setState({
//       status: 'waiting...'
//     })
//   }

//   /** Simply simulate an async call that may take a while to resolve
//    * WARNING: This is not a good hash function
//    */
//   async pseudoHash (toHash) {
//     var hash = 0
//     for (var i = 0; i < toHash.length; ++i) {
//       hash += ((toHash.charCodeAt(i) * (i + 1)) % 127) * Math.pow(128, i)
//     }
//     var hashString = ''
//     while (hash > 0) {
//       var newChar
//       if (hash % 36 < 10) newChar = String.fromCharCode(hash % 36 + '0'.charCodeAt(0))
//       else newChar = String.fromCharCode(hash % 36 + 'a'.charCodeAt(0) - 10)
//       hashString += newChar
//       hash = Math.floor(hash / 36)
//     }
//     await new Promise(resolve => setTimeout(resolve, 1000))
//     return hashString
//   }

//   /**
//    * An example of what one might want to do with a result
//    * Also an example of interacting with console
//    * @param {String} result - The return value or result of the async solver call
//    */
//   async resolveSolve (result) {
//     this.setState({
//       status: 'Solved!'
//     })
//     this.props.outputToConsole('Problem was solved! Ans: ' + result)
//   }

//   /**
//    * A simple renderer so all the utility of our example widget
//    * is visible.
//    */
//   render () {
//     return (
//       <div>
//         <button
//           type='button'
//           onClick={() => {
//             this.callSolver()
//           }}
//           disabled={this.state.status === 'waiting...'}
//           id={this.props.id + '_button'}
//         >
//           Click me to solve!
//         </button>
//         <p>
//           {this.state.status}
//         </p>
//       </div>
//     )
//   }
// }

export default SudokuGame
