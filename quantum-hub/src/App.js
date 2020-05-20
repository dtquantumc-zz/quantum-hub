import React from 'react'

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

import { makeStyles } from '@material-ui/core/styles'
import styles from './assets/jss/material-kit-react/views/app.js'

function App (props) {
  const useStyles = makeStyles(styles)
  const classes = useStyles()

  const userInput = getUserInput(props, classes)
  const appBrand = getAppBrand(props)

  const terminalWindow = <Console textLines={['line1', 'line2']} />
  const gamePanel =
    <div className='game'><GameContainer variant='outlined' />{userInput}</div>
  const howItWorksCard = <DescriptionCard />
  const gridContainerChildren = [terminalWindow, gamePanel, howItWorksCard]

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
