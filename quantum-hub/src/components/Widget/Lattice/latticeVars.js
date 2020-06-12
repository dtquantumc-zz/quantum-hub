// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

/**
 * Static LatticeVars class
 * Reason for this is to provide static variables that don't
 * refresh React
 */
class LatticeVars {
  /**
   * Stores x-y-Index -> Graph Index
   */
  static LatticeDict = {}

  /**
   * Stores Graph Index -> x-y-Index
   */
  static GraphDict = []

  /**
   * Stores XML last state
   */
  static state = ''

  static setState (state) {
    LatticeVars.state = state
  }

  static setDict (dict) {
    LatticeVars.LatticeDict = dict
  }

  static setGraph (arr) {
    LatticeVars.GraphDict = arr
  }
}

export default LatticeVars
