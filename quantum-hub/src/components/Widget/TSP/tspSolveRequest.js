// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import makeLongRequest from '../LongRequest'

import TSPutils from './TSPutils.js'
import TSPstate from './TSPstate.js'

import Graph from './Graph.js'

/**
 * This function does the XML HTTP request for the TSP Widget. It calls the
 * backend, and once the data is returned, postSolve is called. This handles
 * request creation.
 */
function tspSolveRequest (selectedEdges, key, setters, consoleFns) {
  const tspState = TSPstate.getInstance()

  // Set the parameters to send to the server
  const params = {
    typeOfProblem: 'tspSolving',
    selectedEdges: selectedEdges
  }

  // Make the request for a solve to be queued up
  // makeLongRequest is a powerful function, please
  // use it wisely
  makeLongRequest(
    params,
    (xhr) => {
      consoleFns.outputToConsole('The graph has been queued for solving!')
      tspState.setSolving(xhr.response.jobStatus)
    },
    (xhr) => {
      if (xhr.response.jobStatus === tspState.getState()) {
        consoleFns.appendToConsole('.')
      } else if (xhr.response.jobStatus === 'queued') {
        consoleFns.outputToConsole('In Queue')
      } else if (xhr.response.jobStatus === 'started') {
        consoleFns.outputToConsole('Quantum Computing in Progress!')
        consoleFns.outputToConsole('Solving')
      } else {
        consoleFns.outputToConsole(xhr.response.jobStatus)
      }
      tspState.setSolvingState(xhr.response.jobStatus)
    },
    (xhr) => {
      postSolve(xhr, key, setters, consoleFns)
    },
    (xhr) => {
      consoleFns.outputToConsole('Something went wrong')
      console.log(xhr)
      consoleFns.outputToConsole(JSON.stringify(xhr))
      setters.setLoading(false)
      tspState.setIsLoading(false)
    },
    consoleFns.outputToConsole
  )
}

/**
 * postSolve is called after the call to the server is completed.
 * It will handle any (most) errors, set the grid to a solved state if solved,
 * and report back to the user through the console.
 */
function postSolve (xhr, key, setters, consoleFns) {
  const tspState = TSPstate.getInstance()

  if (xhr.status === 200) {
    const tspState = TSPstate.getInstance()
    const waypoints = TSPutils.getWaypointsSinglePath(Graph[key], xhr.response.route)

    const graphLines = TSPutils.isCitiesGraph(key) ? tspState.getCitiesLines() : tspState.getVancouverLines()
    Object.keys(graphLines).forEach(index => {
      graphLines[index].fire('tspSolvedEvent', waypoints)
    })

    setters.setIsPathSolved(true)
    tspState.setIsPathSolved(true)
  } else if (xhr.status === 400) {
    consoleFns.outputToConsole(xhr.response.error)
  } else {
    consoleFns.outputToConsole(xhr.status, xhr.statusText)
  }
  setters.setLoading(false)
  tspState.setIsLoading(false)
}

export default tspSolveRequest
