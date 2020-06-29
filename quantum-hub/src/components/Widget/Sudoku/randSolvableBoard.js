// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

/**
 * This checks if a grid is solvable
 * @param {Array(Array(Int))} grid - This is the grid to try to solve, 0 means empty space
 * @param {Int} n - The number of different ways we're trying to solve the grid
 */
function checkSolvable (grid, gridmask, Num, i, j, rand) {
  i += 1
  if (i === 9) {
    j += 1
    i = 0
    if (j === 9) {
      Num[0] -= 1
      // console.log(grid)
      return Num[0] === 0
    }
  }
  if (grid[i][j] !== 0) {
    return checkSolvable(grid, gridmask, Num, i, j, rand)
  }

  const block = 3 * Math.floor(i / 3) + Math.floor(j / 3)

  const masks = [
    gridmask[block],
    gridmask[i + 9],
    gridmask[j + 18]
  ]

  var vals = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  if (rand) {
    shuffle(vals)
  }

  for (var val of vals) {
    const valM = (1 << val)
    if ((valM & masks[0]) && (valM & masks[1]) && (valM & masks[2])) {
      gridmask[block] = ~valM & masks[0]
      gridmask[i + 9] = ~valM & masks[1]
      gridmask[j + 18] = ~valM & masks[2]
      if (rand) grid[i][j] = val
      if (checkSolvable(grid, gridmask, Num, i, j, rand)) {
        return true
      }
    }
  }
  gridmask[block] = masks[0]
  gridmask[i + 9] = masks[1]
  gridmask[j + 18] = masks[2]
  if (rand) grid[i][j] = 0
  return false
}

/**
 * Someone on stackoverflow once asked why anyone would be using bitmasks
 * in JS. I don't know. I actually don't know why I am doing this
 * This makes a gridmask, where each bit corresponds to the availability
 * of that number.
 *
 * entries 0-8 are the 3x3 blocks
 * 9 - 17 are the rows
 * 18 - 26 are the columns
 *
 * In each mask, you can check if a number is available using:
 * avail = gridmask[i] & (1 << num)
 * @param {Array(Array(Int))} grid - Grid type
 */
function makeGridMask (grid) {
  var gridmask = []
  for (var i = 0; i < 9; ++i) {
    gridmask[i] = 1022
    gridmask[i + 9] = 1022
    gridmask[i + 18] = 1022
  }
  for (i = 0; i < 9; ++i) {
    for (var j = 0; j < 9; ++j) {
      if (!grid[i][j]) continue
      const mask = ~(1 << grid[i][j])
      gridmask[i + 9] &= mask // Rowmask
      gridmask[j + 18] &= mask // Colmask
      gridmask[3 * Math.floor(i / 3) + Math.floor(j / 3)] &= mask // Blockmask
    }
  }
  return gridmask
}

function makeFullGrid () {
  var grid = []
  for (var i = 0; i < 9; ++i) {
    grid[i] = []
    for (var j = 0; j < 9; ++j) {
      grid[i][j] = 0
    }
  }
  var Num = [1]
  if (checkSolvable(grid, makeGridMask(grid), Num, -1, 0, true)) {
    return grid
  }
  // console.log(grid)
  return false
}

function getRandSolvableBoard () {
  var grid = makeFullGrid()
  // return flatGrid(grid)
  var Num = [2]
  // var tries = 100
  // var tried = new Set()
  var toTry = []
  for (var i = 0; i < 9; ++i) {
    for (var j = 0; j <= i; ++j) {
      toTry.push([i, j])
    }
  }

  shuffle(toTry)

  var fails = 3

  for (const [x, y] of toTry) {
    // const x = box[0]
    // const y = box[1]

    const oldvals = [grid[x][y], grid[8 - x][8 - y]]
    grid[x][y] = grid[8 - x][8 - y] = 0

    Num[0] = 2
    if (checkSolvable(grid, makeGridMask(grid), Num, -1, 0, false)) {
      grid[x][y] = oldvals[0]
      grid[8 - x][8 - y] = oldvals[1]
      if (fails-- === 0) break
    }
  }
  console.log(fails)
  console.log('made new sudoku:')
  // console.log(grid)
  console.log((flatGrid(grid).map((e) => { return (e === 0 ? ' ' : e) })).join(''))
  return flatGrid(grid)
}

function flatGrid (grid) {
  var newgrid = []
  for (var i = 0; i < 81; ++i) {
    newgrid[i] = grid[i % 9][Math.floor(i / 9)]
  }
  return newgrid
}

function shuffle (arr) {
  for (var a = arr.length - 1; a > 0; a--) {
    const b = Math.floor(Math.random() * arr.length);
    [arr[a], arr[b]] = [arr[b], arr[a]]
  }
}

export default getRandSolvableBoard
