// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'
// import PropTypes from 'prop-types'

import './nurseScheduler.css'

/**
 * NurseSquare is a single square in the grid of NurseSchedule.
 * (cols+1)*(rows+1) of them are made by DrawNurses.
 * The props they accept affect their CSS and content.
 *
 * The row and column props determine the CSS used. For example,
 * any square with row=0 will have a thick black top border and a
 * medium bottom border.
 *
 * @param {Object} props - The Nurse Square React Properties
 * @prop {Int} row - The row of the square
 * @prop {Int} nR - Total number of rows
 * @prop {Int} col - The column of the square
 * @prop {Int} nC - Total number of columns
 * @prop {String} content - The text contained in the Square.
 * If this is 'X', the square will be shaded in grey.
 */
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
  if (props.content === 'X') {
    classes += ' focused'
  }

  return (
    <div
      className={classes}
    >
      {props.content}
    </div>
  )
}

/**
 * DrawNurses creates a list of NurseSquares that are used to draw the
 * nurse schedule. Displaying it properly relies heavily on the CSS in
 * nurseScheduler.css.
 * @param {Object} props - The Object of properties passed to DrawNurses
 * so it can draw the right grid of nurses.
 * @prop {Array(Array(Boolean))} schedule - The schedule size is a two-dimentional
 * array of Booleans. Each row is an inner array, where True indicates work on that
 * day.
 */
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
          id={'square' + row + col}
        />
      )
    }
  }
  return square
}

export default NurseSquare
export { DrawNurses }
