// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

/**
 * Static NurseVariables class
 * Reason for this is to provide static variables that don't
 * refresh React
 */
export default class NurseVariables {
  static numNurses = 3
  static numDays = 7
  static xhr = null
  static state = ''

  static setNumNurses (num) {
    NurseVariables.numNurses = num
  }

  static setNumDays (num) {
    NurseVariables.numDays = num
  }

  static setXHR (newXHR) {
    NurseVariables.xhr = newXHR
  }

  static setState (newState) {
    NurseVariables.state = newState
  }
}
