// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

// import XMLHttpRequest from 'xhr2'
import makeLongRequest from '../LongRequest'
import nurseVars from './NurseVariables'

/**
 * This is a function to send a solve request to the backend.
 * Uses LongRequest to achieve this with background processes.
 * @param {Function} setSchedule - Sets the Schedule
 * @param {Function} outputToConsole - Output to Console
 * @param {Function} appendToConsole - Append to Console
 * @param {Function} getAPIKey - Get the API Key
 * @param {Function} setLoading - Hook to set the Nurse App's loading state
 */
function nurseSolveRequest (setSchedule, outputToConsole, appendToConsole, getAPIKey, setLoading) {
  if (nurseVars.xhr) return

  setLoading(true)
  outputToConsole(`Scheduling ${nurseVars.numNurses} nurses across ${nurseVars.numDays} days:`)

  const params = {
    // token: getAPIKey(),
    typeOfProblem: 'nurseScheduling',
    n_nurses: Math.floor(nurseVars.numNurses),
    n_days: Math.floor(nurseVars.numDays),
    nurses_per_day: Math.floor(nurseVars.nursesPerDay)
  }

  makeLongRequest(
    params,
    (xhr) => {
      outputToConsole('The nurse problem has been queued for solving!')
      nurseVars.setState(xhr.response.jobStatus)
    },
    (xhr) => {
      if (xhr.response.jobStatus === nurseVars.state) {
        appendToConsole('.')
      } else if (xhr.response.jobStatus === 'queued') {
        outputToConsole('In Queue')
      } else if (xhr.response.jobStatus === 'started') {
        outputToConsole('Quantum Computing in Progress!')
        outputToConsole('Solving')
      } else {
        outputToConsole(xhr.response.jobStatus)
      }
      nurseVars.setState(xhr.response.jobStatus)
    },
    (xhr) => {
      postSolve(xhr, setSchedule, outputToConsole, setLoading)
    },
    (xhr) => {
      outputToConsole('Something went wrong')
      console.log(xhr)
      outputToConsole(JSON.stringify(xhr))
      setLoading(false)
    },
    outputToConsole
  )
}

/**
 * This is a function to do something after the solve has gone
 * through. It decodes the grid configuration sent, and
 * then sets it as the current grid.
 * @param {XMLHTTPRequest} xhr - This is the response containing the results
 * of the nurse scheduling job. The "encoded" schedule is in here. Encoded
 * simply means a sparse matrix representation, as opposed to a complete
 * matrix.
 * @param {Function} setSchedule - A function to set the Nurse Schedule
 * @param {Function} outputToConsole - Outputs a line to the console object
 * @param {Function} setLoading - Hook to set the Nurse App's loading state
 */
function postSolve (xhr, setSchedule, outputToConsole, setLoading) {
  if (xhr.status === 200) {
    outputToConsole('Solved! Enjoy your nurse schedule!')

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
        // console.log(row, col)
      }
    }

    // console.log('The returned nurse schedule is:')
    // newsched.map((row) => console.log(row.join(' ')))

    // console.log(xhr.response.HardNurseConstraint)
    // console.log(xhr.response.HardShiftConstraint)

    setSchedule(newsched)
  } else if (xhr.status === 400) {
    outputToConsole(xhr.response.error)
  } else {
    outputToConsole(`${xhr.status} ${xhr.statusText}`)
    outputToConsole('Your Nurse Scheduling may have been too difficult and timed out.')
    outputToConsole('Please save the configuration you were trying to solve and report the problem')
  }
  setLoading(false)
  nurseVars.setXHR(null)
}

export default nurseSolveRequest
