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
    display: 'flex',
    justifyContent: 'space-between'
  },
  detailButton: {
    marginLeft: '0',
    marginRight: '0'
  },
  instructions: {
    color: 'rgba(29, 85, 97, 1)',
    textAlign: 'center'
  },
  dialogContent: {
    ' & > *': {
      width: 'max-content',
      display: 'inline-block'
    }
  },
  latticeProgress: {
    position: 'absolute',
    bottom: 'calc((307px / 2) - (68px / 2))',
    left: 'calc(50% - (68px / 2))',
    color: '#50c8eb'
  }
})

export default latticeStyle
