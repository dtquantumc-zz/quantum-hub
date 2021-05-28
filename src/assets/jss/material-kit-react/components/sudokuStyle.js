// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

const sudokuStyle = theme => ({
  sudokuRoot: {
    width: '476px',
    margin: theme.spacing(1),
    '& > *': {
      color: 'rgba(29, 85, 97, 1)'
    }
  },
  sudokuInput: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  sudokuProgress: {
    color: '#fff'
  }
})

export default sudokuStyle
