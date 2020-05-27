// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

const sudokuStyle = theme => ({
  sudokuRoot: {
    margin: theme.spacing(1),
    '& > *': {
      color: 'rgba(0, 0, 0, 0.87)'
    }
  },
  sudokuInput: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
})

export default sudokuStyle
