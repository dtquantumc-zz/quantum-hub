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

const baseLattice = [
  [1, 1, 0, 0, 1, 1, 1],
  [0, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1]
]

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
  const [lattice, setLattice] = useState(baseLattice)
  const [mode, setMode] = useState('grid') // Can be 'grid', 'marble', or 'disabled'
  const [conflicts, setConflicts] = useState(0)
  const [minConf, setMinConf] = useState(1000)
  const [loading, setLoading] = [props.loading, props.setLoading]

  const useStyles = makeStyles(styles)

  const classes = useStyles()

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
  } else if (mode === 'marble') {
    instructionText = 'Minimize the conflicts: ' + conflicts
    minText = 'Your best: ' + minConf
  }

  return (
    <div className={classes.latticeRoot}>
      <div className={'latticeBox' + (loading ? ' loading' : '')}>
        <HexGrid
          lattice={lattice}
          setLattice={setLattice}
          setConflicts={(num) => {
            setConflicts(num)
            if (num < minConf) {
              setMinConf(num)
            }
          }}
          mode={mode}
          width={476}
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
          size='sm'
          onClick={() => {
            if (mode === 'grid') {
              setMode('marble')
            } else if (mode === 'marble') {
              setMinConf(1000)
              setMode('grid')
            }
          }}
        >
          {modeText}
        </Button>
        <Button
          className={classes.detailButton}
          color='geeringupSecondary'
          size='sm'
          disabled={mode !== 'marble'}
          onClick={() => {
            latticeSolveRequest(lattice, setLattice, props.outputToConsole, props.appendToConsole, props.getAPIKey, setLoading)
          }}
        >
          Get Quantum Solution
        </Button>
      </div>
    </div>
  )
}

export default LatticeColourer
