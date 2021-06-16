// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

const sudokuStyle = theme => ({
  sudokuRoot: {
    [theme.breakpoints.up('md')]: {
      width: '470px'
    },
    [theme.breakpoints.up('lg')]: {
      width: '540px'
    },
    [theme.breakpoints.up('xl')]: {
      width: '600px'
    },
    margin: theme.spacing(3),
    '& > *': {
      color: 'rgba(29, 85, 97, 1)'
    }
  },
  sudokuInput: {
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  detailButton: {
    marginLeft: '0',
    marginRight: '0',
    width: '145px',
    height: '45px'
  },
  instructions: {
    color: 'rgba(29, 85, 97, 1)',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '17px',
    letterSpacing: '0.045em',
    padding: '0.9375rem'
  },
  sudokuProgress: {
    color: '#fff'
  }
})

export default sudokuStyle
