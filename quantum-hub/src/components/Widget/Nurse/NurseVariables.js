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
class NurseVariables {
  static nursesLowerBound = 1
  static nursesUpperBound = 50

  static daysLowerBound = 1
  static daysUpperBound = 30

  static defaultNumNurses = 3
  static defaultNumDays = 7

  /**
   * The number of nurses for the next solve request
   */
  static numNurses = NurseVariables.defaultNumNurses

  /**
   * The number of days for the next solve request
   */
  static numDays = NurseVariables.defaultNumDays

  /**
   * The latest XML Http Request. Currently unused
   */
  static xhr = null

  /**
   * The state of the latest LongRequest answer.
   * Used in nurseSolveRequest's LongRequest callbacks.
   */
  static state = ''

  /** */
  static setNumNurses (num, errorSetters) {
    if (NurseVariables.isEmptyInput(num)) {
      errorSetters.setNumNursesError(false)
      NurseVariables.numNurses = NurseVariables.defaultNumNurses
    } else if (!NurseVariables.isNumInNursesRange(num)) {
      errorSetters.setNumNursesError(true)
    } else {
      errorSetters.setNumNursesError(false)
      NurseVariables.numNurses = num
    }
  }

  /** */
  static setNumDays (num, errorSetters) {
    if (NurseVariables.isEmptyInput(num)) {
      errorSetters.setNumDaysError(false)
      NurseVariables.numDays = NurseVariables.defaultNumDays
    } else if (!NurseVariables.isNumInDaysRange(num)) {
      errorSetters.setNumDaysError(true)
    } else {
      errorSetters.setNumDaysError(false)
      NurseVariables.numDays = num
    }
  }

  static isEmptyInput (input) {
    return input.trim() === ''
  }

  static isNumInNursesRange (num) {
    return num >= 1 && num <= 50
  }

  static isNumInDaysRange (num) {
    return num >= 1 && num <= 30
  }

  /** */
  static setXHR (newXHR) {
    NurseVariables.xhr = newXHR
  }

  /** */
  static setState (newState) {
    NurseVariables.state = newState
  }
}

export default NurseVariables
