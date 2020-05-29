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
    // outputToConsole(JSON.stringify(xhr.response))
    // outputToConsole(xhr.response.solution_message)
    // outputToConsole(xhr.response.timing.stringify())
    outputToConsole('The returned nurse schedule is:')
    const newsched = xhr.response.Schedule
    newsched.map((row) => outputToConsole(row.join(' ')))
    outputToConsole(xhr.response.HardNurseConstraint)
    outputToConsole(xhr.response.HardShiftConstraint)
    setSchedule(newsched)
  } else if (xhr.status === 400) {
    outputToConsole(xhr.response.error)
  } else {
    outputToConsole(`${xhr.status} ${xhr.statusText}`)
    outputToConsole('Your Sudoku may have been too difficult and timed out.')
    outputToConsole('Please save the Sudoku you were trying to solve and report the problem')
  }
  nurseVars.setXHR(null)
}

export default nurseSolveRequest
