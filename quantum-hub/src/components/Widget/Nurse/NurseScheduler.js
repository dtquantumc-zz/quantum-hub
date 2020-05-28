// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import nurseSolveRequest from './nurseSolveRequest'

import NurseSchedulingInput from '../../Inputs/NurseSchedulingInput'

import './nurseScheduler.css'

/**
 * NurseScheduler is meant to make the Nurse Scheduling tool
 * useable and accessible.
 *
 * Example Use::
 *
 *  const [APIKey, setAPIKey] = useState('')
 *  const [textLines, setTextLines] = useState([])
 *  return (
 *    <NurseScheduler
 *      id='myNurseSched'
 *      getAPIKey={() => APIKey}
 *      outputToConsole={(line) => {
 *        setTextLines(textLines.concat(line))
 *      }}
 *    />
 *  )
 *
 * Properties:
 * @prop {string} id - (Required) This will get extended to
 * serve as the id base string for all underlying components.
 * @prop {func()} getAPIKey - (Required) This needs
 * to be a function that can be called to return the current API
 * key.
 * NOTE: If it returns '', this is equivalent to choosing the
 * simulator.
 * @prop {func(string)} outputToConsole - (Required) This function
 * should take a single string (a line of text), and concatenate
 * it to the current console output string array. If the Console
 * is not being used, this can do anything you want with that
 * string, but you should probably output it in some way.
 */
function NurseScheduler (props) {
  // States for Nurse Scheduling widget.
  // These use React Hooks, so rerendering is done
  // whenever the Set function for a variable is called.
  const [schedule, setSchedule] = useState([])
  const [numNurses, setNumNurses] = useState(4)
  const [numDays, setNumDays] = useState(7)

  var nurseState = {
    schedule: schedule,
    setSchedule: setSchedule,
    numNurses: numNurses,
    setNumNurses: setNumNurses,
    numDays: numDays,
    setNumDays: setNumDays
  }

  return (
    <div>
      <div className='nurseBox'>
        TEST
      </div>
      <NurseSchedulingInput />
    </div>
  )
}

export default NurseScheduler
