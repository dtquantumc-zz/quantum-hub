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
import NurseIcon from '../../images/nurse_icon.svg'

import SudokuIntroText from '../Typography/SudokuIntroText'
import SudokuBriefDescriptionText from '../Typography/SudokuBriefDescriptionText'
import SudokuReadMoreDescriptionText from '../Typography/SudokuReadMoreDescriptionText'
import SudokuIcon from '../../images/sudoku_icon.svg'

import LatticeIntroText from '../Typography/LatticeIntroText'
import LatticeBriefDescriptionText from '../Typography/LatticeBriefDescriptionText'
import LatticeReadMoreDescriptionText from '../Typography/LatticeReadMoreDescriptionText'
import LatticeIcon from '../../images/lattice_icon.svg'

import TSPIntroText from '../Typography/TSPIntroText'
import TSPbriefDescriptionText from '../Typography/TSPbriefDescriptionText'
import TSPreadMoreDescriptionText from '../Typography/TSPreadMoreDescriptionText'
import TSPIcon from '../../images/tsp_icon.svg'

import IsingIntroText from '../Typography/IsingIntroText'
import IsingBriefDescriptionText from '../Typography/IsingBriefDescriptionText'
import IsingReadMoreDescriptionText from '../Typography/IsingReadMoreDescriptionText'
import IsingIcon from '../../images/ising_icon.svg'

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
    component: NurseScheduler,
    image: NurseIcon
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
    component: SudokuGame,
    image: SudokuIcon
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
    component: LatticeColourer,
    image: LatticeIcon
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
    component: IsingModel,
    image: IsingIcon
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
    component: TSP,
    image: TSPIcon
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
