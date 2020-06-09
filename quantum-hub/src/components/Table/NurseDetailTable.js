// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import styles from '../../assets/jss/material-kit-react/components/nurseDetailTableStyle.js'

const useStyles = makeStyles(styles)

export default function NurseDetailTable (props) {
  const classes = useStyles()
  const schedule = props.schedule

  const getDayTableCell = (dayNo) => {
    return (
      <TableCell
        className={classes.day}
        align='right'
      >
        {`Day ${dayNo}`}
      </TableCell>
    )
  }

  const getTableHeadCells = () => {
    const tableCells = [<TableCell>Nurse</TableCell>]
    const numDays = schedule[0].length

    for (let dayIndex = 0; dayIndex < numDays; dayIndex++) {
      const dayNo = dayIndex + 1

      tableCells.push(getDayTableCell(dayNo))
    }

    return tableCells
  }

  const getNurseTableRow = (nurseNo, rowCells) => {
    return (
      <TableRow
        key={`Nurse ${nurseNo}`}
        children={rowCells}
      />)
  }

  const getTableBodyRows = () => {
    const tableRows = []
    const numNurses = schedule.length

    for (let nurseIndex = 0; nurseIndex < numNurses; nurseIndex++) {
      const nurseNo = nurseIndex + 1
      const rowCells = getTableRowCells(`Nurse ${nurseNo}`, nurseIndex)

      tableRows.push(getNurseTableRow(nurseNo, rowCells))
    }

    return tableRows
  }

  const isLeftmostCell = (cellIndex) => {
    return cellIndex === 0
  }

  const getNurseRowHeader = (nurseTitle) => {
    return (
      <TableCell component='th' scope='row'>
        {nurseTitle}
      </TableCell>
    )
  }

  const isNurseScheduled = (nurseScheduleValue) => {
    return nurseScheduleValue === 1
  }

  const isBottomRow = (rowIndex) => {
    return rowIndex === schedule.length - 1
  }

  const getRowClassKey = (isNurseScheduled, nurseIndex) => {
    let rowClassKey = 'row'

    if (isNurseScheduled && isBottomRow(nurseIndex)) {
      rowClassKey = 'lastRowFilled'
    } else if (isNurseScheduled) {
      rowClassKey = 'rowFilled'
    }

    return rowClassKey
  }

  const getRowMarking = (isNurseScheduled) => {
    return isNurseScheduled ? 'X' : ''
  }

  const getScheduledDayCell = (classKey, marking) => {
    return <TableCell className={classes[classKey]} align='center'>{marking}</TableCell>
  }

  const getTableRowCells = (nurseTitle, nurseIndex) => {
    const rowCells = []
    const numDays = schedule[0].length

    for (let dayIndex = 0; dayIndex < numDays; dayIndex++) {
      if (isLeftmostCell(dayIndex)) {
        rowCells.push(getNurseRowHeader(nurseTitle))
      }

      const isScheduled = isNurseScheduled(schedule[nurseIndex][dayIndex])
      const classKey = getRowClassKey(isScheduled, nurseIndex)
      const marking = getRowMarking(isScheduled)

      rowCells.push(getScheduledDayCell(classKey, marking))
    }

    return rowCells
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' stickyHeader aria-label='a dense table'>
        <TableHead>
          <TableRow children={getTableHeadCells(props.schedule, classes)} />
        </TableHead>
        <TableBody children={getTableBodyRows(props.schedule, classes)} />
      </Table>
    </TableContainer>
  )
}

NurseDetailTable.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.array)
}
