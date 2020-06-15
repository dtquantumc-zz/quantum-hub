// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

// import XMLHttpRequest from 'xhr2'
import makeLongRequest from '../LongRequest'
import LatticeVars from './latticeVars'

/**
 * This is a function to send a solve request to the backend.
 * Uses LongRequest to achieve this with background processes.
 * @param {Array} lattice - The lattice
 * @param {Function} setLattice - Sets the Schedule
 * @param {Function} outputToConsole - Output to Console
 * @param {Function} appendToConsole - Append to Console
 * @param {Function} getAPIKey - Get the API Key
 */
function latticeSolveRequest (lattice, setLattice, outputToConsole, appendToConsole, getAPIKey, setLoading) {
  var dict = {}
  var arr = []
  var conns = []
  var index = 0

  for (var i = 0; i < lattice.length; ++i) {
    for (var j = 0; j < lattice[i].length; ++j) {
      if (lattice[i][j] === 0) continue
      arr[index] = [i, j]
      dict[i + ' ' + j] = index
      index++
    }
  }

  for (i = 0; i < lattice.length; ++i) {
    for (j = 0; j < lattice[i].length; ++j) {
      if (lattice[i][j] === 0) continue
      var neighbours
      if (i % 2) {
        neighbours = [[1, 1], [1, 0], [0, 1]]
      } else {
        neighbours = [[1, -1], [1, 0], [0, 1]]
      }

      for (var n of neighbours) {
        const ii = i + n[0]
        const jj = j + n[1]
        console.log(ii + ' ' + jj)
        if (ii >= 0 && ii < lattice.length) {
          if (jj >= 0 && jj < lattice[ii].length) {
            if (lattice[ii][jj] !== 0) {
              conns.push([dict[i + ' ' + j], dict[ii + ' ' + jj]])
            }
          }
        }
      }
    }
  }

  console.log(dict)
  console.log(conns)

  outputToConsole(`Colouring ${index} Lattice points for minimum conflicts:`)

  const params = {
    // token: getAPIKey(),
    typeOfProblem: 'latticeColouring',
    n_vertices: index,
    neighbours: conns
  }

  setLoading(true)

  makeLongRequest(
    params,
    (xhr) => {
      outputToConsole('The colouring problem has been queued for solving!')
      LatticeVars.setState(xhr.response.jobStatus)
    },
    (xhr) => {
      if (xhr.response.jobStatus === LatticeVars.state) {
        appendToConsole('.')
      } else if (xhr.response.jobStatus === 'queued') {
        outputToConsole('In Queue')
      } else if (xhr.response.jobStatus === 'started') {
        outputToConsole('Quantum Computing in Progress!')
        outputToConsole('Solving')
      } else {
        outputToConsole(xhr.response.jobStatus)
      }
      LatticeVars.setState(xhr.response.jobStatus)
    },
    (xhr) => {
      postSolve(xhr, lattice, setLattice, outputToConsole)
      setLoading(false)
    },
    (xhr) => {
      outputToConsole('Something went wrong')
      console.log(xhr)
      outputToConsole(JSON.stringify(xhr))
      setLoading(false)
    },
    outputToConsole
  )

  LatticeVars.setGraph(arr)
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
 */
function postSolve (xhr, lattice, setLattice, outputToConsole) {
  if (xhr.status === 200) {
    outputToConsole('Solved! The quantum solution is now displayed!')

    // console.log(JSON.stringify(xhr.response.solution))

    var newLattice = lattice.map((row) => [...row])

    // Create the new lattice from the old one.
    for (var i = 0; i < xhr.response.solution.length; ++i) {
      const ind = LatticeVars.GraphDict[i]
      newLattice[ind[0]][ind[1]] = xhr.response.solution[i]
    }

    setLattice(newLattice)
  } else if (xhr.status === 400) {
    outputToConsole(xhr.response.error)
  } else {
    outputToConsole(`${xhr.status} ${xhr.statusText}`)
    outputToConsole('Your Lattice may have had some unforeseen troubles.')
    outputToConsole('Please save the configuration you were trying to solve and report the problem')
  }
  // nurseVars.setXHR(null)
}

export default latticeSolveRequest
