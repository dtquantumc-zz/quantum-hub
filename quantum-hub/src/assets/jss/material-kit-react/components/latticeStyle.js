// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

// const hexWidth = 80

const latticeStyle = theme => ({
  latticeRoot: {
    width: '476px',
    margin: theme.spacing(1)
  },
  latticeInput: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  buttonContainer: {
    display: 'flex'
  },
  detailButton: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  instructions: {
    color: 'rgba(0, 0, 0, 0.87)',
    textAlign: 'center'
  },
  dialogContent: {
    ' & > *': {
      width: 'max-content',
      display: 'inline-block'
    }
  }
})

export default latticeStyle
