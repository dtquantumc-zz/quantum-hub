// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState } from 'react'

// core components
// import QPUswitch from './components/Switch/QPUswitch.js'
import Console from './components/CustomOutput/console.js'
import DescriptionCard from './components/Card/DescriptionCard.js'

import Header from './components/Header/Header.js'
import RightHeaderLinks from './components/Header/RightHeaderLinks.js'
import LeftHeaderLinks from './components/Header/LeftHeaderLinks.js'

import GridContainer from './components/Grid/GridContainer.js'

import Footer from './components/Footer/Footer.js'
import FooterLinks from './components/Footer/FooterLinks.js'

import Button from './components/CustomButtons/Button.js'
import GridItem from './components/Grid/GridItem.js'

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
  // const [APIKey, setAPIKey] = useState('')
  const [widgetOverride, overrideWidget] = useState('')
  var [textLines, setTextLines] = useState([])
  const [loading, setLoading] = useState(false)

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
  // const WidgetTag = widgetList[widget].component

  const outputToConsole = (line) => {
    setTextLines(textLines.concat(line))
    textLines = textLines.concat(line)
  }

  const appendToConsole = function (word) {
    textLines[textLines.length - 1] += word
    setTextLines([...textLines])
  }

  const setWidget = (widget) => {
    if (!widgetList[widget]) {
      widget = 'default'
    }
    window.history.replaceState({ app: widget }, widgetList[widget].brand, widgetList[widget].route)
    overrideWidget(widget)
  }

  const widgetComponent =
    Object.keys(widgetList).map((wid) => {
      const WidC = widgetList[wid].component
      return (
        <div
          style={{ display: (wid === widget ? null : 'none') }}
          key={wid + 'Div'}
        >
          <WidC
            id='myWidget'
            getAPIKey={() => ''}
            outputToConsole={outputToConsole}
            appendToConsole={appendToConsole}
            loading={loading}
            setLoading={setLoading}
            key={wid + 'Widget'}
          />
        </div>
      )
    })

  const terminalWindow =
    <Console
      textLines={textLines}
      title={widgetList[widget].name}
      key='terminalWindow'
      getIP={props.live}
    />

  const howItWorksCard =
    <DescriptionCard
      widget={widget}
      key='howItWorksCard'
    />

  const nurseSwitchButton =
    <Button
      className={classes.nurseSwitchButton}
      onClick={() => {
        window.history.replaceState({ app: 'nurse' }, 'Nurse Scheduler', '/app/nurse')
        overrideWidget('nurse')
      }}
      disabled={widget === 'nurse'}
      // disabled={widget === 'nurse' || loading}
      size='sm'
      key='nurseBut'
    >
    Switch to Nurse
    </Button>

  const sudokuSwitchButton =
    <Button
      className={classes.sudokuSwitchButton}
      onClick={() => {
        window.history.replaceState({ app: 'sudoku' }, 'Sudoku Solver', '/app/sudoku')
        overrideWidget('sudoku')
      }}
      disabled={widget === 'sudoku'}
      // disabled={widget === 'sudoku' || loading}
      size='sm'
      key='sudBut'
    >
      Switch to Sudoku
    </Button>

  const latticeSwitchButton =
    <Button
      className={classes.latticeSwitchButton}
      onClick={() => {
        window.history.replaceState({ app: 'lattice' }, 'Lattice Colourer', '/app/lattice')
        overrideWidget('lattice')
      }}
      disabled={widget === 'lattice'}
      // disabled={widget === 'lattice' || loading}
      size='sm'
      key='latBut'
    >
      Switch to Lattice
    </Button>

  const appSwitchButtons =
    <GridItem
      className={classes.container}
      children={[nurseSwitchButton, sudokuSwitchButton, latticeSwitchButton]}
      key='appSwitchButs'
    />
  // const gridContainerChildren = [qpuSwitch, terminalWindow, widgetComponent, howItWorksCard]
  const gridContainerChildren = [terminalWindow, widgetComponent, howItWorksCard, appSwitchButtons]

  return (
    <div>
      <Header
        color='geeringupPrimary'
        brand={appBrand}
        rightLinks={<RightHeaderLinks />}
        leftLinks={<LeftHeaderLinks />}
        fixed
        key='myHeader'
        setWidget={setWidget}
        // loading={loading}
        loading={false}
      />
      <div className={classes.container}>
        <GridContainer
          className={classes.gridContainer}
          children={gridContainerChildren}
          key='myGridContainer'
        />
      </div>
      <Footer
        leftLinks={<FooterLinks />}
        key='myFooter'
      />
    </div>
  )
}

export default App
