// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

/**
 * Static SudokuVariables class
 * Reason for this is to provide static variables that don't
 * refresh React.
 * It has two static variables, xhr and state, and the ability
 * to set each.
 */
class SudokuVariables {
  /**
   * Stores the latest XML Http Request. THis is unused as of now,
   * due to LongRequest
   */
  static xhr = null

  /**
   * Stores the latest state of the sudoku
   * solve request. Used in the LongRequest callbacks
   * of sudokuSolveRequest
   */
  static state = ''

  /**
   * sets xhr
   */
  static setXHR (newXHR) {
    SudokuVariables.xhr = newXHR
  }

  /**
   * Sets state
   */
  static setState (newState) {
    SudokuVariables.state = newState
  }
}

export default SudokuVariables
