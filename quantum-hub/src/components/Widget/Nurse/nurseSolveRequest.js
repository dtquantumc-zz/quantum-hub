// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import XMLHttpRequest from 'xhr2'
import nurseVars from './NurseVariables'

/**
 * This is a function to send a solve request to the backend
 * @param {Object} nurseState - .schedule, .setSchedule,
 * .numNurses, .setNumNurses, .numDays, .setNumDays
 * @param {Function} outputToConsole - Output to Console
 * @param {Function} getAPIKey - Get the API Key
 */
function nurseSolveRequest (setSchedule, outputToConsole, getAPIKey) {
  if (nurseVars.xhr) return

  if (nurseVars.numNurses < 1 || nurseVars.numNurses > 50) {
    outputToConsole('Invalid number of nurses. Please check and try again.')
    return
  }

  if (nurseVars.numDays < 1 || nurseVars.numDays > 30) {
    outputToConsole('Invalid number of days. Please check and try again.')
    return
  }

  // setEnabled(false)
  outputToConsole(`Scheduling ${nurseVars.numNurses} nurses across ${nurseVars.numDays} days:`)

  nurseVars.xhr = new XMLHttpRequest()
  var xhr = nurseVars.xhr
  const url = '/qpu_request'
  const params = {
    // token: getAPIKey(),
    typeOfProblem: 'nurseScheduling',
    n_nurses: Math.floor(nurseVars.numNurses),
    n_days: Math.floor(nurseVars.numDays)
  }
  const async = true
  xhr.open('POST', url, async)

  xhr.responseType = 'json'

  xhr.onload = () => {
    postSolve(setSchedule, outputToConsole)
  }
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(params))
  // nurseVars.setXHR(xhr)
  outputToConsole('Solving...')
}

/**
 * This is a function to do something after the solve has gone
 * through
 */
function postSolve (setSchedule, outputToConsole) {
  const xhr = nurseVars.xhr

  if (xhr.status === 200) {
    outputToConsole('Solved!')

    // Create the new schedule. This is done in reverse to avoid
    // changing the length of each array more than once
    var row
    var newsched = new Array(xhr.response.n_nurses)
    for (row = xhr.response.n_nurses - 1; row >= 0; row--) {
      newsched[row] = []
      for (var col = xhr.response.n_days - 1; col >= 0; col--) {
        newsched[row][col] = 0
      }
    }

    for (row = 0; row < xhr.response.schedule.length; ++row) {
      for (var i = 0; i < xhr.response.schedule[row].length; ++i) {
        const col = xhr.response.schedule[row][i]
        newsched[row][col] = 1
        console.log(row, col)
      }
    }

    outputToConsole('The returned nurse schedule is:')
    newsched.map((row) => outputToConsole(row.join(' ')))

    outputToConsole(xhr.response.HardNurseConstraint)
    outputToConsole(xhr.response.HardShiftConstraint)

    setSchedule(newsched)
  } else if (xhr.status === 400) {
    outputToConsole(xhr.response.error)
  } else {
    outputToConsole(`${xhr.status} ${xhr.statusText}`)
    outputToConsole('Your Nurse Scheduling may have been too difficult and timed out.')
    outputToConsole('Please save the configuration you were trying to solve and report the problem')
  }
  nurseVars.setXHR(null)
}

export default nurseSolveRequest
