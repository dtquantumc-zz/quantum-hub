// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState } from 'react'
import clsx from 'clsx'
// import PropTypes from 'prop-types'

import nurseSolveRequest from './nurseSolveRequest'
import NurseSchedule from '../../DatePicker/NurseSchedule.js'
import nurseVars from './NurseVariables'

import NurseSchedulingInput from '../../Inputs/NurseSchedulingInput'

import NurseDetailTable from '../../Table/NurseDetailTable.js'

import Button from '../../CustomButtons/Button.js'

import CircularProgress from '@material-ui/core/CircularProgress'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { makeStyles } from '@material-ui/core/styles'
import styles from '../../../assets/jss/material-kit-react/components/nurseStyle.js'
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
 *      appendToConsole={}
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
 * @prop {func(string)} appendToConsole - (Required) Same as output,
 * but just appends
 * the given string to the last line of the Console.
 */
function NurseScheduler (props) {
  // States for Nurse Scheduling widget.
  // These use React Hooks, so rerendering is done
  // whenever the Set function for a variable is called.
  var [schedule, setSchedule] = useState([[false]])
  const [open, setOpen] = React.useState(false)
  const [scroll, setScroll] = React.useState('paper')
  const [loading, setLoading] = [props.loading, props.setLoading]
  const descriptionElementRef = React.useRef(null)

  const useStyles = makeStyles(styles)

  const classes = useStyles()

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const handleClickOpen = (scrollType) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  /** Sample Schedule in the commented lines below */
  // schedule = [
  //   [0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
  //   [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1]
  // ]

  const nC = schedule[0].length
  const nR = schedule.length
  document.documentElement.style.setProperty('--numCol', nC)
  document.documentElement.style.setProperty('--numRow', nR)

  return (
    <div className={classes.nurseRoot}>
      <div className='nurseBox'>
        <div className={loading ? 'nurseSchedule loading' : 'nurseSchedule'}>
          <NurseSchedule schedule={schedule} />
        </div>
        {loading && <CircularProgress size={68} className={classes.nurseProgress} />}
      </div>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.detailButton}
          color='geeringupSecondary'
          size='sm'
          onClick={handleClickOpen('paper')}
          disabled={loading}
        >
            More Detail
        </Button>
      </div>
      <div className={loading ? clsx(classes.instructions, classes.loading) : classes.instructions}>
      Please enter a number of Nurses and Days to be scheduled!
      </div>
      <NurseSchedulingInput
        setNumDays={nurseVars.setNumDays}
        setNumNurses={nurseVars.setNumNurses}
        setNursesPerDay={nurseVars.setNursesPerDay}
        onSolve={
          () => nurseSolveRequest(setSchedule, props.outputToConsole, props.appendToConsole, props.getAPIKey, setLoading)
        }
        disabled={loading}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        maxWidth='false'
      >
        <DialogTitle id='scroll-dialog-title'>Detailed View</DialogTitle>
        <DialogContent className={classes.dialogContent} dividers={scroll === 'paper'}>
          <NurseDetailTable schedule={schedule} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color='geeringupSecondary'
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NurseScheduler
