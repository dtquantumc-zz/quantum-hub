// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState } from 'react'
import Console from './console'
// import ToggleSwitch from './toggleSwitch'
import APISwitch from './APISwitch'
import Widget from './widget'
// import PropTypes from 'prop-types'
// import './component_css/console.css'

/**
 * TestComp is a test component for making sure things work :P
 */
function TestComp (props) {
  const [APIKey, setAPIKey] = useState('')

  const [textLines, setTextLines] = useState([])

  return (
    <div>
      <APISwitch
        id='myAPISwitch'
        switchText={['QPU2', 'Sim2']}
        setAPIKey={(key) => {
          setAPIKey(key)
        }}
        defaultChecked={false}
      />
      <Widget
        id='myWidget'
        getAPIKey={() => APIKey}
        outputToConsole={(line) => {
          setTextLines(textLines.concat(line))
        }}
      />
      <Console textLines={textLines} />
    </div>
  )
}

export default TestComp
