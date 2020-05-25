import React, { useState } from 'react'

// core components
import DescriptionCard from './components/Card/DescriptionCard'
import GridContainer from './components/Grid/GridContainer'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import GameContainer from './components/Paper/GameContainer'
import Button from './components/CustomButtons/Button'
import Console from './component/console'
import DaysField from './components/Inputs/DaysField'
import NurseField from './components/Inputs/NurseField'
import RightHeaderLinks from './components/Header/RightHeaderLinks'
import LeftHeaderLinks from './components/Header/LeftHeaderLinks'
import FooterLinks from './components/Footer/FooterLinks'
import SudokuGame from './component/sudoku'
import APISwitch from './component/APISwitch'
import QPUswitch from './components/Switch/QPUswitch.js'

import { makeStyles } from '@material-ui/core/styles'
import styles from './assets/jss/material-kit-react/views/app.js'

function App (props) {
  const useStyles = makeStyles(styles)
  const classes = useStyles()
  const [APIKey, setAPIKey] = useState('test')
  var [textLines, setTextLines] = useState([])

  const appBrand = getAppBrand(props)

  const typeOfProblem = {
    isNurseScheduler: props.isNurseScheduler,
    isSudokuSolver: props.isSudokuSolver
  }
  const qpuSwitch = <QPUswitch typeOfProblem={typeOfProblem} key='qpuSwitch' />
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

  const apiSwitch =
    <APISwitch
      id='myAPISwitch'
      switchText={['QPU', 'Simulator']}
      setAPIKey={(key) => {
        setAPIKey(key)
      }}
      defaultChecked={false}
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
        {apiSwitch}
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

function getUserInput (props, classes) {
  let userInput

  if (props.isNurseScheduler) {
    userInput =
      <div className={classes.nurseSchedulingInput}>
        <NurseField />
        <DaysField />
      </div>
  } else {
    userInput =
      <div className={classes.sudokuInput}>
        <Button color='greeingup'>
          Solve
        </Button>
      </div>
  }

  return userInput
}

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
