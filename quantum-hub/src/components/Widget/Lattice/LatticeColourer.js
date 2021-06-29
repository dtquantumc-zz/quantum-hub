// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState } from 'react'
// import PropTypes from 'prop-types'

import latticeSolveRequest from './latticeSolveRequest'
import HexGrid from './HexGrid'

import Button from '../../CustomButtons/Button.js'
import CircularProgress from '@material-ui/core/CircularProgress'

import { makeStyles } from '@material-ui/core/styles'
import styles from '../../../assets/jss/material-kit-react/components/latticeStyle.js'
import './latticeColourer.css'
import LatticeVars from './latticeVars'

// const baseLattice = [
//   [1, 1, 0, 0, 1, 1, 1],
//   [0, 1, 1, 1, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1],
//   [0, 1, 1, 1, 0, 1],
//   [1, 1, 1, 0, 0, 0, 1],
//   [1, 1, 0, 0, 0, 1]
// ]

/**
 * LatticeColourer is meant to give access to a hexagonal
 * lattice-based two-colouring optimization problem.
 *
 * Example Use::
 *
 *  const [APIKey, setAPIKey] = useState('')
 *  const [textLines, setTextLines] = useState([])
 *  return (
 *    <LatticeColourer
 *      id='myLattice'
 *      getAPIKey={() => APIKey}
 *      outputToConsole={(line) => {
 *        setTextLines(textLines.concat(line))
 *      }}
 *      appendToConsole={}
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
function LatticeColourer (props) {
  // States for Lattice Colouring widget.
  // These use React Hooks, so rerendering is done
  // whenever the Set function for a variable is called.
  const [lattice, setLattice] = useState(getRandomLattice())
  const [mode, setMode] = useState('grid') // Can be 'grid', 'marble', or 'disabled'
  const [loading, setLoading] = [props.loading, props.setLoading]

  const useStyles = makeStyles(styles)

  const classes = useStyles()

  const isQuantum = latticeSame(lattice, LatticeVars.quantumLattice[0])

  var conflicts = '?'
  if (mode !== 'grid') {
    conflicts = calculateConflicts(lattice)
    // console.log(conflicts)
    if (conflicts.length <= LatticeVars.bestLattice[1] && !isQuantum) {
      LatticeVars.setBest(lattice.map((row) => [...row]), conflicts.length)
    }
  }

  const isBest = LatticeVars.bestLattice[1] === conflicts.length

  var modeText
  if (mode === 'grid') {
    modeText = 'Lock Grid'
  } else {
    modeText = 'Unlock'
  }

  var instructionText = ''
  var minText = ''
  if (mode === 'grid') {
    instructionText = 'Build a Grid to play on!'
  } else if (isQuantum) {
    instructionText = 'The Quantum Solution has ' + conflicts.length + ' conflicts!'
  } else if (isBest) {
    instructionText = 'This is your best solution yet with ' + conflicts.length + ' conflicts!'
  } else if (mode === 'marble') {
    instructionText = 'Minimize the conflicts: ' + conflicts.length
  }

  const bestText = 'My Best Solution: ' + LatticeVars.bestLattice[1]

  const qText = 'Quantum Solution: ' + LatticeVars.quantumLattice[1]

  return (
    <div className={classes.latticeRoot}>
      <div className={'latticeBox' + (loading ? ' loading' : '')}>
        <HexGrid
          lattice={lattice}
          setLattice={setLattice}
          conflicts={conflicts}
          mode={mode}
          width={props.isMobile ? 300 : 476}
        />
        {loading && <CircularProgress size={68} className={classes.latticeProgress} />}
      </div>
      <div className={classes.instructions}>
        {instructionText}
        <br />
        {minText}
      </div>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.detailButton}
          color='geeringupSecondary'
          size='md'
          round
          onClick={() => {
            if (mode === 'grid') {
              setMode('marble')
            } else if (mode === 'marble') {
              setLattice(lattice.map((row) => row.map((e) => e * e)))
              LatticeVars.setBest(null, 1000)
              LatticeVars.setQuantum([], '?')
              setMode('grid')
            }
          }}
        >
          {modeText}
        </Button>
        <Button
          className={classes.detailButton}
          color='geeringupSecondary'
          size='md'
          round
          disabled={false}
          onClick={() => {
            if (mode === 'marble') {
              latticeSolveRequest(
                lattice,
                (newLattice) => {
                  LatticeVars.setQuantum(newLattice, (calculateConflicts(newLattice)).length)
                  setLattice(newLattice)
                },
                props.outputToConsole,
                props.appendToConsole,
                props.getAPIKey,
                setLoading
              )
            } else if (mode === 'grid') {
              setLattice(getRandomLattice())
            }
          }}
        >
          {mode === 'marble' ? 'Get Quantum Solution' : 'Random Grid'}
        </Button>
      </div>
      <div className={classes.buttonContainer} style={{ display: (mode !== 'grid' ? null : 'none') }}>
        <Button
          className={classes.detailButton}
          color='geeringupSecondary'
          size='md'
          round
          disabled={mode !== 'marble'}
          onClick={() => {
            setLattice(LatticeVars.bestLattice[0].map((row) => [...row]))
          }}
        >
          {bestText}
        </Button>
        <Button
          className={classes.detailButton}
          color='geeringupSecondary'
          size='md'
          round
          disabled={mode !== 'marble' || LatticeVars.quantumLattice[0].length === 0}
          onClick={() => {
            setLattice(LatticeVars.quantumLattice[0].map((row) => [...row]))
          }}
        >
          {qText}
        </Button>
      </div>
    </div>
  )
}

function calculateConflicts (lattice) {
  var conflicts = []
  for (var i = 0; i < lattice.length; ++i) {
    for (var j = 0; j < lattice[i].length; ++j) {
      if (!lattice[i][j]) continue
      const neighbours = (i % 2 !== 0) ? [[1, 1], [1, 0], [0, 1]] : [[1, -1], [1, 0], [0, 1]]
      for (const n of neighbours) {
        const [ii, jj] = [i + n[0], j + n[1]]
        // console.log(ii + ' ' + jj)
        if (ii >= 0 && ii < lattice.length && jj >= 0 && jj < lattice[ii].length) {
          if (lattice[ii][jj] === lattice[i][j]) {
            conflicts.push([i, j, ii, jj])
          }
        }
      }
    }
  }
  return conflicts
}

function latticeSame (lattice1, lattice2) {
  // console.log(lattice1)
  // console.log(lattice2)
  if (lattice1.length !== lattice2.length) return false
  for (var i = 0; i < lattice1.length; ++i) {
    if (lattice1[i].length !== lattice2[i].length) return false
    for (var j = 0; j < lattice1[i].length; ++j) {
      if (lattice1[i][j] !== lattice2[i][j]) return false
    }
  }
  return true
}

function getRandomLattice () {
  var newLattice = []
  const size = 6 + Math.floor(Math.random() * 3)
  for (var i = 0; i < size - 1; ++i) {
    newLattice[i] = []
    for (var j = 0; j < size - (i % 2 !== 0); ++j) {
      newLattice[i][j] = Math.floor(Math.random() * 3)
      if (newLattice[i][j] > 0) {
        newLattice[i][j] = 1
      }
    }
  }
  return newLattice
}

export default LatticeColourer
