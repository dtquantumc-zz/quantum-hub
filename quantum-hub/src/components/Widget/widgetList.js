// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import SudokuGame from './Sudoku/Sudoku'
import NurseScheduler from './Nurse/NurseScheduler'
import LatticeColourer from './Lattice/LatticeColourer'
import IsingModel from './Ising/IsingModel'
import TSP from './TSP/TravellingSalesperson'
import Widget from './EmptyWidget/EmptyWidget'

import NurseBriefDescriptionText from '../Typography/NurseBriefDescriptionText'
import NurseReadMoreDescriptionText from '../Typography/NurseReadMoreDescriptionText'

import SudokuBriefDescriptionText from '../Typography/SudokuBriefDescriptionText'
import SudokuReadMoreDescriptionText from '../Typography/SudokuReadMoreDescriptionText'

import LatticeBriefDescriptionText from '../Typography/LatticeBriefDescriptionText'
import LatticeReadMoreDescriptionText from '../Typography/LatticeReadMoreDescriptionText'

import TSPbriefDescriptionText from '../Typography/TSPbriefDescriptionText'
import TSPreadMoreDescriptionText from '../Typography/TSPreadMoreDescriptionText'

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
    briefDescriptionText: <LatticeBriefDescriptionText />,
    readMoreDescriptionText: <LatticeReadMoreDescriptionText />,
    brand: 'Lattice Two-Colouring',
    component: LatticeColourer
  },
  ising: {
    enabler: 'isIsingModel',
    route: '/app/ising',
    name: 'ising-model',
    title: 'Ising Model Visualiser',
    briefDescriptionText: <span>This is placeholder text</span>,
    readMoreDescriptionText: <span>This is more placeholder text</span>,
    brand: 'Ising Model Visualiser',
    component: IsingModel
  },
  tsp: {
    enabler: 'isTSP',
    route: '/app/tsp',
    name: 'tsp',
    title: 'Travelling Salesperson',
    briefDescriptionText: <TSPbriefDescriptionText />,
    readMoreDescriptionText: <TSPreadMoreDescriptionText />,
    brand: 'Travelling Salesperson',
    component: TSP
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
