import React from 'react'
import './sudoku.css'

/**
 * Draws a singular sudoku square, like you see 81 of in the whole 9x9 grid.
 * Uses its x and y props to decide which of its grid borders should be bolded
 * and how bold they should be. This is what gives the board its Sudoku look.
 * @prop {Integer} x - The x position of the Square in its grid
 * @prop {Integer} y - The y position of the Square in its grid
 * @prop {Boolean} focused - Marks whether the square should be in focus
 * @prop {Function} onClick - Function to be called on button click
 * @prop {Integer} value - What will be displayed in the Square
 * @prop {Boolean} bolded - Whether the square's text should be bolded
 * @prop {Boolean} enabled - Whether the button should be enabled
 */
function GridSquare (props) {
  var classes = 'gridSquare'
  if (props.x === 0) classes += ' gridLeftest'
  else if (props.x % 3 === 0) classes += ' gridLeft'

  if (props.x === 8) classes += ' gridRightest'
  else if (props.x % 3 === 2) classes += ' gridRight'

  if (props.y === 0) classes += ' gridToppest'
  else if (props.y % 3 === 0) classes += ' gridTop'

  if (props.y === 8) classes += ' gridBottomest'
  else if (props.y % 3 === 2) classes += ' gridBottom'
  if (props.focused) classes += ' focused'
  if (props.bolded) classes += ' bolded'
  if (props.rowInvalid) classes += ' rowInvalid'
  if (props.colnInvalid) classes += ' colnInvalid'
  if (props.blockInvalid) classes += ' blockInvalid'

  const validValue = props.value === 0 ? '' : String(props.value)
  const invalidValue = <div className='invalidOutline'>{validValue}</div>

  return (
    <button
      type='button'
      id={'button' + props.x + props.y}
      className={classes}
      onClick={props.onClick}
      disabled={!props.enabled}
    >
      {props.invalid ? invalidValue : validValue}
    </button>
  )
}

/**
 * Returns a set of 81 GridSquares to make a Sudoku with.
 * @param {Array(81)} sudokuGrid - An array of 81 numbers, left-to-right, top-to-bottom
 * that make up the sudoku grid.
 * @param {Array(81)} gridBold - An array of 81 booleans, depicting if each square is
 * bolded or not.
 * @param {Array} shaded - An array of all the shaded buttons, in case more than one
 * is shaded at once.
 * @param {Boolean} enabled - Whether the whole board is enabled, or should be shaded
 * and disabled.
 * @param {Function} setCurrentSquare - A function to change the current selected
 * square to any clicked square.
 * @param {Array(Array(9))} gridInvalid - A 9x9 array with True indicating that sudoku
 * tile should be drawn as invalid.
 * @param {Array(9)} rowInvalid - An array of all the rows with errors in them marked by True
 * @param {Array(9)} colnInvalid - Same as rowInvalid, but columns.
 * @param {Object} blockInvalid - A JS object with keys [blockRow, blockColn] marking
 * blocks as errorred or error-free.
 */
function makeSudokuGrid (sudokuGrid, gridBold, shaded, enabled, setCurrentSquare, gridInvalid, rowInvalid, colnInvalid, blockInvalid) {
  return (
    [0, 1, 2, 3, 4, 5, 6, 7, 8].map((y) => {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => {
        const blockRow = Math.floor(y / 3)
        const blockColn = Math.floor(x / 3)
        const blockKey = [blockRow, blockColn]
        return (
          <GridSquare
            x={x}
            y={y}
            key={x + 9 * y} // Keys should be unique for React rendered components on the same layer
            value={sudokuGrid[x + 9 * y]}
            bolded={gridBold[x + 9 * y]}
            enabled={enabled}
            invalid={gridInvalid[y][x]}
            rowInvalid={!!rowInvalid[y]}
            colnInvalid={!!colnInvalid[x]}
            blockInvalid={!!blockInvalid[blockKey]}
            onClick={() => setCurrentSquare([x, y])}
            focused={shaded.includes(x + 9 * y)}
          />
        )
      })
    })
  )
}

export default GridSquare
export { makeSudokuGrid }
