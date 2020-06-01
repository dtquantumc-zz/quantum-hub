// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

/**
 * Static SudokuVariables class
 * Reason for this is to provide static variables that don't
 * refresh React
 */
export default class SudokuVariables {
  static xhr = null

  static setXHR (newXHR) {
    SudokuVariables.xhr = newXHR
  }
}
