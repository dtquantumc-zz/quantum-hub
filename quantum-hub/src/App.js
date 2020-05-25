// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState } from 'react'

// core components
import QPUswitch from './components/Switch/QPUswitch.js'
import Console from './component/console.js'
import GameContainer from './components/Paper/GameContainer.js'
import DescriptionCard from './components/Card/DescriptionCard.js'

import Header from './components/Header/Header.js'
import RightHeaderLinks from './components/Header/RightHeaderLinks.js'
import LeftHeaderLinks from './components/Header/LeftHeaderLinks.js'

import GridContainer from './components/Grid/GridContainer.js'

import Footer from './components/Footer/Footer.js'
import FooterLinks from './components/Footer/FooterLinks.js'

// TODO: Upcoming
// import NurseSchedulingInput from './components/Inputs/NurseSchedulingInput.js'

import Button from './components/CustomButtons/Button.js'

import SudokuGame from './component/sudoku.js'
// @material-ui/icons
import { makeStyles } from '@material-ui/core/styles'

import styles from './assets/jss/material-kit-react/views/app.js'

/**
 *
 * @param {object} props properties for the App
 * @returns {object} React Component
 */
function App (props) {
  const useStyles = makeStyles(styles)
  const classes = useStyles()
  const [APIKey, setAPIKey] = useState('')
  var [textLines, setTextLines] = useState([])

  const appBrand = getAppBrand(props)

  const typeOfProblem = {
    isNurseScheduler: props.isNurseScheduler,
    isSudokuSolver: props.isSudokuSolver
  }
  const qpuSwitch = <QPUswitch typeOfProblem={typeOfProblem} key='qpuSwitch' setAPIKey={setAPIKey} />
  const terminalWindow = <Console textLines={textLines} key='terminalWindow' />

  // Eventually, set a way to change this based on URL parameters
  // E.g. ?game=sudoku or ?game=nurse
  const game =
    <SudokuGame
      id='myWidget'
      getAPIKey={() => APIKey}
      outputToConsole={(line) => {
        setTextLines(textLines.concat(line))
        textLines = textLines.concat(line)
      }}
      key='myGame'
    />

  const gamePanel =
    <div className='game' key='gamePanel'><GameContainer variant='outlined' children={game} /></div>
  const howItWorksCard = <DescriptionCard key='howItWorksCard' />
  const gridContainerChildren = [qpuSwitch, terminalWindow, gamePanel, howItWorksCard]

  return (
    <div>
      <Header
        color='geeringup'
        brand={appBrand}
        rightLinks={<RightHeaderLinks />}
        leftLinks={<LeftHeaderLinks />}
        fixed
      />
      <div className={classes.container}>
        <GridContainer
          className={classes.gridContainer}
          children={gridContainerChildren}
        />
      </div>
      <Footer
        leftLinks={<FooterLinks />}
      />
    </div>
  )
}

/**
 *
 * @param {object} props object from the App
 * @param {object} classes styles for input field React Components
 * @returns {object} userInput React Component
 */
function getUserInput (props, classes) {
  let userInput

  if (props.isNurseScheduler) {
    userInput =
      <div className={classes.nurseSchedulingInput}>
        {/* TODO: Upcoming */}
        {/* <NurseSchedulingInput /> */}
      </div>
  } else {
    userInput =
      <div className={classes.sudokuInput}>
        <Button color='geeringup'>
          Solve
        </Button>
      </div>
  }

  return userInput
}

/**
 *
 * @param {object} props object from the App
 * @returns {string} brand for the App
 */
function getAppBrand (props) {
  let appBrand

  if (props.isNurseScheduler) {
    appBrand = 'Nurse Scheduler'
  } else {
    appBrand = 'Sudoku Solver'
  }

  return appBrand
}

export default App
