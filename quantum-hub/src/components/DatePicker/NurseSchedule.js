/**
MIT License

Copyright (c) 2017 Dmitriy Kovalenko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
 */

import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Badge, createMuiTheme } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { ThemeProvider } from '@material-ui/styles'
import NursesOnDayDialog from '../Dialog/NursesOnDayDialog.js'

import { addKeyValToObject } from '../utils.js'

import styles from '../../assets/jss/material-kit-react/components/nurseScheduleStyle.js'
const useStyles = makeStyles(styles)

const NurseSchedule = (props) => {
  const classes = useStyles()
  const geeringupTheme = createMuiTheme(styles.geeringupTheme)

  const [date, changeDate] = useState(new Date())
  const [open, setOpen] = React.useState(false)
  const [nurses, setNurses] = useState([])
  const [selectedValue, setSelectedValue] = React.useState(0)

  const schedule = props.schedule
  const scheduleInfo = getScheduleInfo(schedule)
  const daysWithNurses = scheduleInfo.daysWithNurses
  const daysToNurses = scheduleInfo.daysToNurses

  const handleClickOpen = (day) => {
    setOpen(true)
    const newNurses = daysToNurses[day]
    setNurses(newNurses)
  }

  const handleClose = (value) => {
    setOpen(false)
    setSelectedValue(value)
  }

  const getIndexFromDay = (day) => {
    return new Date(day).getDate() - 1
  }

  const isNurseScheduledOnDay = (dayIndex, isInCurrentMonth) => {
    return (daysWithNurses.has(dayIndex) && isInCurrentMonth)
  }

  const getDayWithBadge = (dayComponent, onDoubleClick) => {
    return (
      <Badge
        classes={{ dot: classes.badge }}
        overlap='circle'
        variant='dot'
        badgeContent=' '
        onDoubleClick={onDoubleClick}
      >
        {dayComponent}
      </Badge>
    )
  }

  const renderDay = (day, selectedDate, isInCurrentMonth, dayComponent) => {
    const dayIndex = getIndexFromDay(day)
    const onDoubleClick = () => {
      handleClickOpen(dayIndex)
    }
    return isNurseScheduledOnDay(dayIndex, isInCurrentMonth)
      ? getDayWithBadge(dayComponent, onDoubleClick)
      : dayComponent
  }

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={geeringupTheme}>
          <DatePicker
            autoOk
            orientation='landscape'
            variant='static'
            openTo='date'
            value={date}
            onChange={changeDate}
            renderDay={renderDay}
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
      <NursesOnDayDialog selectedValue={selectedValue} open={open} onClose={handleClose} nurseIndices={nurses} />
    </>
  )
}

function getScheduleInfo (schedule) {
  const daysWithNurses = new Set()
  let daysToNurses = {}
  for (let i = 0; i < schedule.length; i++) {
    for (let j = 0; j < schedule[0].length; j++) {
      if (schedule[i][j] === 1) {
        if (!daysWithNurses.has(j)) {
          daysWithNurses.add(j)
        }
        daysToNurses = addKeyValToObject(j, i, daysToNurses)
      }
    }
  }

  return {
    daysWithNurses: daysWithNurses,
    daysToNurses: daysToNurses
  }
}

NurseSchedule.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.array)
}

export default NurseSchedule
