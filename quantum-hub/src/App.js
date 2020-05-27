// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState } from 'react'

// core components
import QPUswitch from './components/Switch/QPUswitch.js'
import Console from './components/CustomOutput/console.js'
import DescriptionCard from './components/Card/DescriptionCard.js'

import Header from './components/Header/Header.js'
import RightHeaderLinks from './components/Header/RightHeaderLinks.js'
import LeftHeaderLinks from './components/Header/LeftHeaderLinks.js'

import GridContainer from './components/Grid/GridContainer.js'

import Footer from './components/Footer/Footer.js'
import FooterLinks from './components/Footer/FooterLinks.js'

// TODO: Upcoming
// import NurseSchedulingInput from './components/Inputs/NurseSchedulingInput.js'

// import Button from './components/CustomButtons/Button.js'

// import SudokuGame from './components/Widget/sudoku.js'
// import Widget from './components/Widget/widget.js'
// @material-ui/icons
import { makeStyles } from '@material-ui/core/styles'

import styles from './assets/jss/material-kit-react/views/app.js'

import widgetList from './components/Widget/widgetList'

/**
 *
 * @param {object} props properties for the App
 * @returns {object} React Component
 */
function App (props) {
  const useStyles = makeStyles(styles)
  const classes = useStyles()
  const [APIKey, setAPIKey] = useState('')
  const [widgetOverride, overrideWidget] = useState('')
  var [textLines, setTextLines] = useState([])

  // const appBrand = getAppBrand(props)

  // const typeOfProblem = {
  //   isNurseScheduler: props.isNurseScheduler,
  //   isSudokuSolver: props.isSudokuSolver
  // }

  // widget is a string, a key to the widgetList object describing the widget
  let widget
  if (widgetOverride && widgetList[widgetOverride]) {
    widget = widgetOverride
  } else if (widgetList[props.widget]) {
    widget = props.widget
  } else {
    widget = 'default'
  }

  const appBrand = widgetList[widget].brand
  const WidgetTag = widgetList[widget].component

  const widgetComponent =
    <WidgetTag
      id='myWidget'
      getAPIKey={() => APIKey}
      outputToConsole={(line) => {
        setTextLines(textLines.concat(line))
        textLines = textLines.concat(line)
      }}
      key='myGame'
    />
  // if (widget === 'sudoku') {
  //   widgetComponent =
  //     <SudokuGame
  //       id='myWidget'
  //       getAPIKey={() => APIKey}
  //       outputToConsole={(line) => {
  //         setTextLines(textLines.concat(line))
  //         textLines = textLines.concat(line)
  //       }}
  //       key='myGame'
  //     />
  // } else if (widget === 'nurse') {
  //   widgetComponent = <p>No nurses yet</p>
  // } else {
  //   widgetComponent = <p>Really nothing here :(</p>
  // }

  // const qpuSwitch = <QPUswitch typeOfProblem='isSudokuSolver' key='qpuSwitch' setAPIKey={setAPIKey} />
  const qpuSwitch = <QPUswitch key='qpuSwitch' setAPIKey={setAPIKey} />
  const terminalWindow = <Console textLines={textLines} title={widgetList[widget].name} key='terminalWindow' />
  const howItWorksCard = <DescriptionCard widget={widget} key='howItWorksCard' />
  const gridContainerChildren = [qpuSwitch, terminalWindow, widgetComponent, howItWorksCard]

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
      <button onClick={() => overrideWidget('sudoku')}> switch to sudoku </button>
      <button onClick={() => overrideWidget('nurse')}> switch to nurse </button>
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
// function getUserInput (props, classes) {
//   let userInput

//   if (props.isNurseScheduler) {
//     userInput =
//       <div className={classes.nurseSchedulingInput}>
//         {/* TODO: Upcoming */}
//         {/* <NurseSchedulingInput /> */}
//       </div>
//   } else {
//     userInput =
//       <div className={classes.sudokuInput}>
//         <Button color='geeringup'>
//           Solve
//         </Button>
//       </div>
//   }

//   return userInput
// }

// function loadWidget (props, classes) {
//   let widget
//   if (props.widget === 'sudoku') {
//     widget =
//       <SudokuGame
//         id='myWidget'
//         getAPIKey={() => APIKey}
//         outputToConsole={(line) => {
//           setTextLines(textLines.concat(line))
//           textLines = textLines.concat(line)
//         }}
//         key='myGame'
//       />
//   } else if (props.widget === 'nurse') {
//     widget = <p>Nothing here sorry</p>
//   } else {
//     widget = <p>Really nothing here :(</p>
//   }
//   return widget
// }

/**
 *
 * @param {object} props object from the App
 * @returns {string} brand for the App
 */
// function getAppBrand (props) {
//   let appBrand

//   if (props.isNurseScheduler) {
//     appBrand = 'Nurse Scheduler'
//   } else {
//     appBrand = 'Sudoku Solver'
//   }

//   return appBrand
// }

export default App
