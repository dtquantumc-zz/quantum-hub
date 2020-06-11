// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import SudokuGame from './Sudoku/Sudoku'
import NurseScheduler from './Nurse/NurseScheduler'
import LatticeColourer from './Lattice/LatticeColourer'
import Widget from './EmptyWidget/EmptyWidget'

import NurseBriefDescriptionText from '../Typography/NurseBriefDescriptionText.js'
import NurseReadMoreDescriptionText from '../Typography/NurseReadMoreDescriptionText.js'

import SudokuBriefDescriptionText from '../Typography/SudokuBriefDescriptionText.js'
import SudokuReadMoreDescriptionText from '../Typography/SudokuReadMoreDescriptionText.js'

const widgetList = {
  nurse: {
    enabler: 'isNurseScheduler',
    route: '/app/nurse',
    name: 'nurse-scheduler',
    title: 'The Nurse Scheduling Problem',
    briefDescriptionText: <NurseBriefDescriptionText />,
    readMoreDescriptionText: <NurseReadMoreDescriptionText />,
    brand: 'Nurse Scheduler',
    component: NurseScheduler
  },
  sudoku: {
    enabler: 'isSudokuSolver',
    route: '/app/sudoku',
    name: 'sudoku-solver',
    title: 'The Sudoku Problem',
    briefDescriptionText: <SudokuBriefDescriptionText />,
    readMoreDescriptionText: <SudokuReadMoreDescriptionText />,
    brand: 'Sudoku Solver',
    component: SudokuGame
  },
  lattice: {
    enabler: 'isLatticeColourer',
    route: '/app/lattice',
    name: 'lattice-colourer',
    title: 'Lattice Two-Colouring',
    briefDescriptionText: <p>Temporary Description Text</p>,
    readMoreDescriptionText: <p>Temporary Description Text</p>,
    brand: 'Lattice Two-Colouring',
    component: LatticeColourer
  },
  default: {
    enabler: 'isNothing',
    route: '/app/default',
    name: 'no-app',
    title: 'No title found',
    briefDescriptionText: 'No Brief Description Found',
    readMoreDescriptionText: 'No Read More Description Text Found',
    brand: 'No game found',
    component: Widget
  }
}

export default widgetList
