// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './nurseScheduler.css'

function NurseSquare (props) {
  var classes = 'gridSquare'
  if (props.row === 0) {
    classes += ' gridToppest'
    classes += ' gridBottom'
  }
  if (props.col === 0) {
    classes += ' gridLeftest'
    classes += ' gridRight'
  }
  if (props.row === 1) {
    classes += ' gridTop'
  }
  if (props.col === 1) {
    classes += ' gridLeft'
  }
  if (props.row === props.nR) {
    classes += ' gridBottomest'
  }
  if (props.col === props.nC) {
    classes += ' gridRightest'
  }

  return (
    <div
      className={classes}
    >
      {props.content}
    </div>
  )
}

function DrawNurses (props) {
  const schedule = props.schedule
  const nC = schedule[0].length
  const nR = schedule.length

  var square = []
  var content

  for (var row = 0; row <= nR; ++row) {
    for (var col = 0; col <= nC; ++col) {
      if (row === 0 && col === 0) {
        content = ''
      } else if (row === 0) {
        content = `Day ${col}`
      } else if (col === 0) {
        content = `Nurse ${row}`
      } else {
        content = schedule[row - 1][col - 1] ? 'X' : ''
      }
      square.push(
        <NurseSquare
          row={row}
          col={col}
          content={content}
          nC={nC}
          nR={nR}
          key={[row, col]}
        />
      )
    }
  }
  return square
}

export default NurseSquare
export { DrawNurses }
