// import React from 'react'
import SudokuGame from './Sudoku/Sudoku'
import NurseScheduler from './Nurse/NurseScheduler'
import Widget from './EmptyWidget/EmptyWidget'

const widgetList = {
  sudoku: {
    enabler: 'isSudokuSolver',
    route: '/app/sudoku',
    name: 'sudoku-solver',
    title: 'How it works',
    subheader: 'This is a subheader',
    description: 'This sudoku game is really fun! :D',
    brand: 'Sudoku Solver',
    component: SudokuGame
  },
  nurse: {
    enabler: 'isNurseScheduler',
    route: '/app/nurse',
    name: 'nurse-scheduler',
    title: 'Nurse Scheduling',
    subheader: 'How to schedule:',
    description: 'We schedule nurses :O',
    brand: 'Nurse Scheduler',
    component: NurseScheduler
  },
  default: {
    enabler: 'isNothing',
    route: '/app/default',
    name: 'no-app',
    title: 'No title found',
    subheader: 'No subheader found',
    description: 'No description found',
    brand: 'No game found',
    component: Widget
  }
}

export default widgetList
