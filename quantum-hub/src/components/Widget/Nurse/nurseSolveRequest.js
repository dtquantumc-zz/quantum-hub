// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import XMLHttpRequest from 'xhr2'

/**
 * This is a function to send a solve request to the backend
 * @param {Object} nurseState - .schedule, .setSchedule,
 * .numNurses, .setNumNurses, .numDays, .setNumDays
 * @param {Function} outputToConsole - Output to Console
 * @param {Function} getAPIKey - Get the API Key
 */
function nurseSolveRequest (nurseState, outputToConsole, getAPIKey) {
  /* do something */
  outputToConsole('Solving a nurse request...')
}

/**
 * This is a function to do something after the solve has gone
 * through
 */
function postSolve (nurseState, outputToConsole) {
  /* nurseState.setSchedule() */
}

export default nurseSolveRequest
