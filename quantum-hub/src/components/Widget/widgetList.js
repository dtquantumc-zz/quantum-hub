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

import NurseIntroText from '../Typography/NurseIntroText'
import NurseBriefDescriptionText from '../Typography/NurseBriefDescriptionText'
import NurseReadMoreDescriptionText from '../Typography/NurseReadMoreDescriptionText'

import SudokuIntroText from '../Typography/SudokuIntroText'
import SudokuBriefDescriptionText from '../Typography/SudokuBriefDescriptionText'
import SudokuReadMoreDescriptionText from '../Typography/SudokuReadMoreDescriptionText'

import LatticeIntroText from '../Typography/LatticeIntroText'
import LatticeBriefDescriptionText from '../Typography/LatticeBriefDescriptionText'
import LatticeReadMoreDescriptionText from '../Typography/LatticeReadMoreDescriptionText'

import TSPIntroText from '../Typography/TSPIntroText'
import TSPbriefDescriptionText from '../Typography/TSPbriefDescriptionText'
import TSPreadMoreDescriptionText from '../Typography/TSPreadMoreDescriptionText'

import IsingIntroText from '../Typography/IsingIntroText'
import IsingBriefDescriptionText from '../Typography/IsingBriefDescriptionText'
import IsingReadMoreDescriptionText from '../Typography/IsingReadMoreDescriptionText'

const widgetList = {
  nurse: {
    enabler: 'isNurseScheduler',
    route: '/app/nurse',
    name: 'nurse-scheduler',
    title: 'The Nurse Scheduling Problem',
    introText: <NurseIntroText />,
    briefDescriptionText: <NurseBriefDescriptionText />,
    readMoreDescriptionText: <NurseReadMoreDescriptionText />,
    brand: 'Nurse Scheduler',
    visible: true,
    component: NurseScheduler
  },
  sudoku: {
    enabler: 'isSudokuSolver',
    route: '/app/sudoku',
    name: 'sudoku-solver',
    title: 'The Sudoku Problem',
    introText: <SudokuIntroText />,
    briefDescriptionText: <SudokuBriefDescriptionText />,
    readMoreDescriptionText: <SudokuReadMoreDescriptionText />,
    brand: 'Sudoku Solver',
    visible: true,
    component: SudokuGame
  },
  lattice: {
    enabler: 'isLatticeColourer',
    route: '/app/lattice',
    name: 'lattice-colourer',
    title: 'Lattice Two-Colouring',
    introText: <LatticeIntroText />,
    briefDescriptionText: <LatticeBriefDescriptionText />,
    readMoreDescriptionText: <LatticeReadMoreDescriptionText />,
    brand: 'Lattice Two-Colouring',
    visible: true,
    component: LatticeColourer
  },
  ising: {
    enabler: 'isIsingModel',
    route: '/app/ising',
    name: 'ising-model',
    title: 'Ising Model Visualiser',
    introText: <IsingIntroText />,
    briefDescriptionText: <IsingBriefDescriptionText />,
    readMoreDescriptionText: <IsingReadMoreDescriptionText />,
    brand: 'Ising Model Visualiser',
    visible: true,
    component: IsingModel
  },
  tsp: {
    enabler: 'isTSP',
    route: '/app/tsp',
    name: 'tsp',
    title: 'Travelling Salesperson',
    introText: <TSPIntroText />,
    briefDescriptionText: <TSPbriefDescriptionText />,
    readMoreDescriptionText: <TSPreadMoreDescriptionText />,
    brand: 'Travelling Salesperson',
    visible: true,
    component: TSP
  },
  default: {
    enabler: 'isNothing',
    route: '/app/default',
    name: 'no-app',
    title: 'No Title Found',
    introText: 'No Intro Text Found',
    briefDescriptionText: 'No Brief Description Found',
    readMoreDescriptionText: 'No Read More Description Text Found',
    brand: 'No game found',
    visible: false,
    component: Widget
  }
}

export default widgetList
