// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */
import Utils from '../../utils.js'

export default class SudokuValidationUtils {
  /**
    *
    * @param {object} sudokuValidationResults object containing validation
    * results of the Sudoku Grid's rows, columns and block
    * @returns true if the Sudoku Grid (rows, columns and block) are valid
    */
  static isValidSudokuGrid (sudokuValidationResults) {
    return SudokuValidationUtils.areRowsValid(sudokuValidationResults) &&
    SudokuValidationUtils.areColnsValid(sudokuValidationResults) &&
    SudokuValidationUtils.areBlocksValid(sudokuValidationResults)
  }

  /**
    *
    * @param {object} sudokuValidationResults object containing validation
    * results of the Sudoku Grid's rows, columns and block
    * @returns true if rows are valid
    */
  static areRowsValid (sudokuValidationResults) {
    return SudokuValidationUtils.isEmptyObject(sudokuValidationResults.duplicatesInRow)
  }

  /**
    *
    * @param {object} sudokuValidationResults object containing validation
    * results of the Sudoku Grid's rows, columns and block
    * @returns true if columns are valid
    */
  static areColnsValid (sudokuValidationResults) {
    return SudokuValidationUtils.isEmptyObject(sudokuValidationResults.duplicatesInColn)
  }

  /**
    *
    * @param {object} sudokuValidationResults object containing validation
    * results of the Sudoku Grid's rows, columns and block
    * @returns true if blocks are valid
    */
  static areBlocksValid (sudokuValidationResults) {
    return SudokuValidationUtils.isEmptyObject(sudokuValidationResults.duplicatesInBlock)
  }

  /**
    *
    * @param {object} object
    * @returns true if the param is an empty object
    */
  static isEmptyObject (object) {
    return SudokuValidationUtils.isKeyLengthZero(object) &&
        SudokuValidationUtils.isObjectConstructor(object)
  }

  /**
    *
    * @param {object} object
    * @returns true if object has no keys
    */
  static isKeyLengthZero (object) {
    return Object.keys(object).length === 0
  }

  /**
    *
    * @param {object} object
    * @returns true if the param's constructor is Object
    */
  static isObjectConstructor (object) {
    return object.constructor === Object
  }

  /**
    *
    * @param {object} setters object containing setter hooks
    * @param {object} sudokuGrid array of arrays representing the
    * Sudoku Grid
    */
  static validateKeyPress (setters, sudokuGrid) {
    const sudokuValidationResults = SudokuValidationUtils.getSudokuValidationResults(sudokuGrid)

    if (SudokuValidationUtils.isValidSudokuGrid(sudokuValidationResults)) {
      SudokuValidationUtils.resetInvalidStates(setters)
    } else {
      SudokuValidationUtils.updateInvalidStates(setters, sudokuValidationResults)
    }
  }

  /**
    *
    * @param {object} sudokuGrid array of arrays representing the
    * Sudoku Grid
    * @returns {object} validationResult of the Sudoku Grid's rows,
    * columns and block
    */
  static getSudokuValidationResults (sudokuGrid) {
    const N = 9
    const M = 9

    let seenInRow = {}
    let seenInColn = {}
    let seenInBlock = {}

    const sudokuBoard = SudokuValidationUtils.getUnflattenedSudokuBoard(sudokuGrid)

    for (let i = 0; i < M; i++) {
      for (let j = 0; j < N; j++) {
        const current = sudokuBoard[i][j]

        if (current === 0) {
          continue
        }

        const inRow = current + ' in row ' + i
        const inColn = current + ' in coln ' + j

        const blockRow = Math.floor(i / 3)
        const blockColumn = Math.floor(j / 3)
        const inBlock = current + ' in block ' + blockRow + ' - ' + blockColumn

        seenInRow = Utils.addKeyValToObject(inRow, [i, j], seenInRow)
        seenInColn = Utils.addKeyValToObject(inColn, [i, j], seenInColn)
        seenInBlock = Utils.addKeyValToObject(inBlock, [i, j], seenInBlock)
      }
    }

    const validationResult = {
      duplicatesInRow: SudokuValidationUtils.getDuplicatesInRow(seenInRow),
      duplicatesInColn: SudokuValidationUtils.getDuplicatesInColn(seenInColn),
      duplicatesInBlock: SudokuValidationUtils.getDuplicatesInBlock(seenInBlock)
    }

    return validationResult
  }

  /**
    *
    * @param {object} seenInRow mapping numbers in rows to
    * arrays filled with their coordinates
    * @returns {object} duplicatesInRow mapping row coordinates to
    * arrays filled with their column coordinates
    */
  static getDuplicatesInRow (seenInRow) {
    let duplicatesInRow = {}

    Object.keys(seenInRow).forEach(row => {
      if (SudokuValidationUtils.hasDuplicates(seenInRow, row)) {
        seenInRow[row].forEach((coord) => {
          duplicatesInRow = Utils.addKeyValToObject(coord[0], coord[1], duplicatesInRow)
        })
      }
    })

    return duplicatesInRow
  }

  /**
    *
    * @param {object} seenInColn mapping numbers in columns to
    * arrays filled with their coordinates
    * @returns {object} duplicatesInColn mapping column coordinates to
    * arrays filled with their row coordinates
    */
  static getDuplicatesInColn (seenInColn) {
    let duplicatesInColn = {}

    Object.keys(seenInColn).forEach(coln => {
      if (SudokuValidationUtils.hasDuplicates(seenInColn, coln)) {
        seenInColn[coln].forEach((coord) => {
          duplicatesInColn = Utils.addKeyValToObject(coord[1], coord[0], duplicatesInColn)
        })
      }
    })

    return duplicatesInColn
  }

  /**
    *
    * @param {object} seenInBlock mapping numbers in blocks to
    * arrays filled with their coordinates
    * @returns {object} duplicatesInBlock mapping block coordinates to
    * arrays filled with the grid coordinates of populated cells
    */
  static getDuplicatesInBlock (seenInBlock) {
    let duplicatesInBlock = {}

    Object.keys(seenInBlock).forEach(block => {
      if (SudokuValidationUtils.hasDuplicates(seenInBlock, block)) {
        seenInBlock[block].forEach((coord) => {
          const key = [Math.floor(coord[0] / 3), Math.floor(coord[1] / 3)]
          duplicatesInBlock = Utils.addKeyValToObject(key, coord, duplicatesInBlock)
        })
      }
    })

    return duplicatesInBlock
  }

  /**
    *
    * @param {object} object
    * @param {string} key
    * @returns true if key's value array
    * has length greater than 1
    */
  static hasDuplicates (object, key) {
    return object[key].length > 1
  }

  /**
    *
    * @param {object} flattenedSudokuBoard 1-D array representing
    * the Sudoku Grid
    * @returns 2-D array representing the Sudoku Grid
    */
  static getUnflattenedSudokuBoard (flattenedSudokuBoard) {
    const unflattenedSudokuBoard = []
    let row = []

    for (let i = 0; i < flattenedSudokuBoard.length; i++) {
      row.push(flattenedSudokuBoard[i])

      if (SudokuValidationUtils.isRowFilled(i)) {
        unflattenedSudokuBoard.push(row)
        row = []
      }
    }

    return unflattenedSudokuBoard
  }

  /**
    *
    * @param {number} lastFilledIndex
    * @returns true if the row has 9 entries
    * (indexing from 0)
    */
  static isRowFilled (lastFilledIndex) {
    return (lastFilledIndex + 1) % 9 === 0
  }

  /**
    *
    * @param {object} setters object containing setter hooks
    * @param {object} sudokuValidationResults object containing validation
    * results of the Sudoku Grid's rows, columns and block
    */
  static updateInvalidStates (setters, sudokuValidationResults) {
    let newGridInvalid = SudokuValidationUtils.getEmptyGrid()
    newGridInvalid = SudokuValidationUtils.handleInvalidRow(sudokuValidationResults, newGridInvalid, setters)
    newGridInvalid = SudokuValidationUtils.handleInvalidColn(sudokuValidationResults, newGridInvalid, setters)
    newGridInvalid = SudokuValidationUtils.handleInvalidBlock(sudokuValidationResults, newGridInvalid, setters)

    setters.setGridInvalid(newGridInvalid)
  }

  /**
    *
    * @param {object} sudokuValidationResults object containing validation
    * results of the Sudoku Grid's rows, columns and block
    * @param {object} gridInvalid array of arrays containing coordinates
    * of invalid placements in the Sudoku Grid
    * @param {object} setters object containing setter hooks
    * @returns {object} gridInvalid array of arrays with updated coordinates
    * of invalid placements in the Sudoku Grid
    */
  static handleInvalidRow (sudokuValidationResults, gridInvalid, setters) {
    if (SudokuValidationUtils.areRowsValid(sudokuValidationResults)) {
      SudokuValidationUtils.resetRowInvalid(setters)
    } else {
      const duplicatesInRow = sudokuValidationResults.duplicatesInRow
      setters.setRowInvalid(duplicatesInRow)
      gridInvalid = SudokuValidationUtils.updateInvalidRowCoordinatesInGrid(duplicatesInRow, gridInvalid)
    }

    return gridInvalid
  }

  /**
    *
    * @param {object} duplicatesInRow mapping row coordinates to
    * arrays filled with their column coordinates
    * @param {object} gridInvalid array of arrays containing coordinates
    * of invalid placements in the Sudoku Grid
    * @returns {object} gridInvalid array of arrays with updated coordinates
    * of invalid placements in the Sudoku Grid
    */
  static updateInvalidRowCoordinatesInGrid (duplicatesInRow, gridInvalid) {
    Object.keys(duplicatesInRow).forEach(row => {
      const columns = duplicatesInRow[row]
      columns.forEach(column => {
        gridInvalid[row][column] = true
      })
    })

    return gridInvalid
  }

  /**
    *
    * @param {object} sudokuValidationResults object containing validation
    * results of the Sudoku Grid's rows, columns and block
    * @param {object} gridInvalid array of arrays containing coordinates
    * of invalid placements in the Sudoku Grid
    * @param {object} setters object containing setter hooks
    * @returns {object} gridInvalid array of arrays with updated coordinates
    * of invalid placements in the Sudoku Grid
    */
  static handleInvalidColn (sudokuValidationResults, gridInvalid, setters) {
    if (SudokuValidationUtils.areColnsValid(sudokuValidationResults)) {
      SudokuValidationUtils.resetColnInvalid(setters)
    } else {
      const duplicatesInColn = sudokuValidationResults.duplicatesInColn
      setters.setColnInvalid(duplicatesInColn)
      gridInvalid = SudokuValidationUtils.updateInvalidColnCoordinatesInGrid(duplicatesInColn, gridInvalid)
    }

    return gridInvalid
  }

  /**
    *
    * @param {object} duplicatesInColn mapping column coordinates to
    * arrays filled with their row coordinates
    * @param {object} gridInvalid array of arrays containing coordinates
    * of invalid placements in the Sudoku Grid
    * @returns {object} gridInvalid array of arrays with updated coordinates
    * of invalid placements in the Sudoku Grid
    */
  static updateInvalidColnCoordinatesInGrid (duplicatesInColn, gridInvalid) {
    Object.keys(duplicatesInColn).forEach(column => {
      const rows = duplicatesInColn[column]
      rows.forEach(row => {
        gridInvalid[row][column] = true
      })
    })

    return gridInvalid
  }

  /**
    *
    * @param {object} sudokuValidationResults object containing validation
    * results of the Sudoku Grid's rows, columns and block
    * @param {object} gridInvalid array of arrays containing coordinates
    * of invalid placements in the Sudoku Grid
    * @param {object} setters object containing setter hooks
    * @returns {object} gridInvalid array of arrays with updated coordinates
    * of invalid placements in the Sudoku Grid
    */
  static handleInvalidBlock (sudokuValidationResults, gridInvalid, setters) {
    if (SudokuValidationUtils.areBlocksValid(sudokuValidationResults)) {
      SudokuValidationUtils.resetBlockInvalid(setters)
    } else {
      const duplicatesInBlock = sudokuValidationResults.duplicatesInBlock
      setters.setBlockInvalid(duplicatesInBlock)
      gridInvalid = SudokuValidationUtils.updateInvalidBlockCoordinatesInGrid(duplicatesInBlock, gridInvalid)
    }

    return gridInvalid
  }

  /**
    *
    * @param {object} duplicatesInBlock mapping block coordinates to
    * arrays filled with the grid coordinates of populated cells
    * @param {object} gridInvalid array of arrays containing coordinates
    * of invalid placements in the Sudoku Grid
    * @returns {object} gridInvalid array of arrays with updated coordinates
    * of invalid placements in the Sudoku Grid
    */
  static updateInvalidBlockCoordinatesInGrid (duplicatesInBlock, gridInvalid) {
    Object.keys(duplicatesInBlock).forEach(block => {
      const coords = duplicatesInBlock[block]
      coords.forEach(coord => {
        gridInvalid[coord[0]][coord[1]] = true
      })
    })

    return gridInvalid
  }

  /**
    *
    * @returns an empty 9 x 9 grid (array of arrays)
    * filled with zeros
    */
  static getEmptyGrid () {
    return SudokuValidationUtils.getEmptyColn().map(() => SudokuValidationUtils.getEmptyRow())
  }

  /**
    *
    * @returns {object} an empty
    * array filled with zeros
    */
  static getEmptyColn () {
    return Array(9).fill(0)
  }

  /**
    *
    * @returns {object} an empty
    * array filled with zeros
    */
  static getEmptyRow () {
    return Array(9).fill(0)
  }

  /**
    *
    * @returns {object} an empty object
    */
  static getEmptyBlock () {
    return {}
  }

  /**
    *
    * @param {object} setters object containing setter hooks
    */
  static resetInvalidStates (setters) {
    SudokuValidationUtils.resetGridInvalid(setters)
    SudokuValidationUtils.resetRowInvalid(setters)
    SudokuValidationUtils.resetColnInvalid(setters)
    SudokuValidationUtils.resetBlockInvalid(setters)
  }

  /**
    *
    * @param {object} setters object containing setter hooks
    */
  static resetGridInvalid (setters) {
    setters.setGridInvalid(SudokuValidationUtils.getEmptyGrid())
  }

  /**
    *
    * @param {object} setters object containing setter hooks
    */
  static resetRowInvalid (setters) {
    setters.setRowInvalid(SudokuValidationUtils.getEmptyRow())
  }

  /**
    *
    * @param {object} setters object containing setter hooks
    */
  static resetColnInvalid (setters) {
    setters.setColnInvalid(SudokuValidationUtils.getEmptyColn())
  }

  /**
    *
    * @param {object} setters object containing setter hooks
    */
  static resetBlockInvalid (setters) {
    setters.setBlockInvalid(SudokuValidationUtils.getEmptyBlock())
  }
}
