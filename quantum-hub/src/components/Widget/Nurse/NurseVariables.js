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
  /**
   * The number of nurses for the next solve request
   */
  static numNurses = 3

  /**
   * The number of days for the next solve request
   */
  static numDays = 7

  /**
   * The number of nurses that should be scheduled for each day
   */
  static nursesPerDay = 1

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
  static setNumNurses (num) {
    NurseVariables.numNurses = num
  }

  /** */
  static setNumDays (num) {
    NurseVariables.numDays = num
  }

  /** */
  static setNursesPerDay (num) {
    NurseVariables.nursesPerDay = num
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
