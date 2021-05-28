// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

function isNumberPress (keyCode) {
  return (keyCode >= 48 && keyCode <= 57)
}

function isNumpadPress (keyCode) {
  return (keyCode >= 96 && keyCode <= 105)
}

function isArrowKeyPress (keyCode) {
  return (keyCode >= 37 && keyCode <= 40)
}

function updateEmptyState (state) {
  const gridState = isGridAllZeros(state.grid)
  state.setEmpty(gridState)
}

function isGridAllZeros (grid) {
  return grid.every(gridItem => gridItem === 0)
}

function flatten (coords) {
  return coords[0] + 9 * coords[1]
}

function emptySudokuGrid (state) {
  if (!state.empty) {
    resetSudokuGrid(state.setGrid, state.setBold)
    state.setCur([0, 0])
    state.setEmpty(true)
  }
}

/**
 * Fills the Sudoku grid with 0s
 * Sets the grid state using setSudokuGrid
 * @param {Function} setSudokuGrid - Sets an external Sudoku Grid variable
 * @param {Function} setBold - Sets a grid variable indicating boldness of square
*/
function resetSudokuGrid (setSudokuGrid, setBold) {
  const newGrid = Array(81).fill(0)
  setSudokuGrid(newGrid)
  const newBold = Array(81).fill(false)
  setBold(newBold)
}

function boldify (grid) {
  var newBold = Array(81)
  for (var i = 0; i < 81; ++i) {
    if (grid[i] !== 0) newBold[i] = true
    else newBold[i] = false
  }
  // console.log(newBold)
  return newBold
}

export {
  isNumberPress,
  isNumpadPress,
  isArrowKeyPress,
  updateEmptyState,
  isGridAllZeros,
  flatten,
  emptySudokuGrid,
  resetSudokuGrid,
  boldify
}
