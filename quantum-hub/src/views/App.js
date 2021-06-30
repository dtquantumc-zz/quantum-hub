// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState, useEffect } from 'react'

// core components
// import QPUswitch from './components/Switch/QPUswitch.js'
import ButtonGroup from '../components/ButtonGroup/ButtonGroup.js'
import Console from '../components/CustomOutput/console.js'
import IntroCard from '../components/Card/IntroCard.js'
import DescriptionCard from '../components/Card/DescriptionCard.js'

import Header from '../components/Header/Header.js'
import RightHeaderLinks from '../components/Header/RightHeaderLinks.js'
import LeftHeaderLinks from '../components/Header/LeftHeaderLinks.js'

import GridContainer from '../components/Grid/GridContainer.js'

import Footer from '../components/Footer/Footer.js'
import FooterLinks from '../components/Footer/FooterLinks.js'

// import Button from './components/CustomButtons/Button.js'
// import GridItem from './components/Grid/GridItem.js'

import { makeStyles } from '@material-ui/core/styles'

import styles from '../assets/jss/material-kit-react/views/app.js'

import widgetList from '../components/Widget/widgetList'
import ConsoleModal from '../components/Modal/ConsoleModal.js'

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
  const breakpoint = 600;
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowResize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    // event listener that updates the "width" state variable when the window size changes 
    window.addEventListener('resize', handleWindowResize);

    // return a function from the effect that removes the event listener
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, []);

  let isMobile = (width <= breakpoint)

  const resetConsole = () => {
    textLines.length = 0
    setTextLines(textLines)
  }

  // widget is a string, a key to the widgetList object describing the widget
  let widget

  const setWidget = (wid) => {
    if (!widgetList[wid]) {
      widget = 'default'
    }
    window.history.replaceState({ app: wid }, widgetList[wid].brand, widgetList[wid].route)
    overrideWidget(wid)
    resetConsole()
  }

  if (widgetOverride && widgetList[widgetOverride]) {
    widget = widgetOverride
  } else if (widgetList[props.widget]) {
    widget = props.widget
  } else {
    setWidget('lattice')
    widget = 'lattice'
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

  const gameMenu =
    <div>
      {!isMobile && (<ButtonGroup
        key='gameMenu'
        setWidget={setWidget}
      />)}
    </div>

  const widgetComponent =
    Object.keys(widgetList).map((wid) => {
      const WidC = widgetList[wid].component
      return (
        <div
          style={{ display: (wid === widget ? null : 'none') }}
          key={wid + 'Div'}
        >
          <IntroCard
            color='geeringupPrimary'
            brand={appBrand}
            setWidget={setWidget}
            widget={widget}
            isMobile={isMobile}
            key='myWidgetIntro'
          />
          <WidC
            id='myWidget'
            getAPIKey={() => ''}
            outputToConsole={outputToConsole}
            appendToConsole={appendToConsole}
            loading={loading}
            setLoading={setLoading}
            key={wid + 'Widget'}
            isMobile={isMobile}
          />
          {isMobile && (<ConsoleModal 
            widget={widget}
            textLines={textLines}
            title={widgetList[widget].name}
            key='terminalWindow'
            getIP={props.live}
          />)}
        </div>
      )
    })

  const terminalWindowAndGameInfo =
    <div className={classes.rightColumn}>
      {!isMobile && (<Console
        textLines={textLines}
        title={widgetList[widget].name}
        key='terminalWindow'
        getIP={props.live}
      />)}
      <DescriptionCard
        widget={widget}
        key='howItWorksCard'
      />
    </div>

  const gridContainerChildren = [gameMenu, widgetComponent, terminalWindowAndGameInfo]

  return (
    <div>
      <Header
        color='geeringupPrimary'
        rightLinks={<RightHeaderLinks />}
        leftLinks={<LeftHeaderLinks />}
        fixed
        key='myHeader'
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
