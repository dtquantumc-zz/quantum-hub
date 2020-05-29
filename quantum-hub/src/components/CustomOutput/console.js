// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import XMLHttpRequest from 'xhr2'

// styling
import './component_css/console.css'
import styles from '../../assets/jss/material-kit-react/components/consoleStyle.js'
const useStyles = makeStyles(styles)

/**
 * Console is a React component that displays lines of
 * text, and when updated, scrolls to the bottom of its output
 *
 * Note: to change size, shape, and most non-scroll
 * properties, modify the called css
 *
 *
 * Example Use::
 *
 *  <Console textLines={['line1', 'line2']} />
 *
 * @param {Array(String)} textLines - A textLines property is required
 *  Modify this variable in a parent's state to reload and update
 *  the console.
 * @param {String} title - A title for the console
 */
function Console (props) {
  const classes = useStyles()

  // This is a React Reference object, used for statically
  // referencing a particular element.
  const divBotRef = useRef(null)

  var [xhr, setXHR] = useState(null)
  var [IP, setIP] = useState('')

  if (!xhr) {
    xhr = new XMLHttpRequest()
    const url = '/get_ip'
    const async = true
    xhr.open('GET', url, async)
    xhr.responseType = 'json'
    xhr.onload = () => {
      if (xhr.response) {
        setIP(xhr.response.ip)
      }
    }
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send()
    setXHR(xhr)
  }

  const lines = props.textLines

  // The Reference object comes in handy here, where
  // we scroll it into view. This happens every time
  // the console is updated by React.
  useEffect(() => {
    divBotRef.current.scrollIntoView({
      block: 'nearest',
      inline: 'start'
    })
  })

  // Note, the empty list element at the bottom has the
  // Reference attached. This means that scrolling to it
  // has the effect of scrolling to the bottom of the console.
  return (
    <div className={classes.console}>
      <div id='console_head' className='scroll_head'>
        {props.title ? props.title : 'Console'}{IP ? `@${IP}` : ''}
      </div>
      <div id='console' className='scroll_console'>
        <ul>
          {lines.map((line, index) => {
            return <li key={index}>{line}</li>
          })}
          <li ref={divBotRef} />
        </ul>
      </div>
    </div>
  )
}

// Require the correct property to be passed
Console.propTypes = {
  textLines: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string
}

export default Console
