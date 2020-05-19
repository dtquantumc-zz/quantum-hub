// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import './component_css/console.css'

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
 */
function Console (props) {
  // This is a React Reference object, used for statically
  // referencing a particular element.
  const divBotRef = useRef(null)

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
    <div id='console' className='scroll_console'>
      <ul>
        {lines.map((line, index) => {
          return <li key={index}>{line}</li>
        })}
        <li ref={divBotRef} />
      </ul>
    </div>
  )
}

// Require the correct property to be passed
Console.propTypes = {
  textLines: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Console
