// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

// const hexWidth = 80

const latticeStyle = theme => ({
  latticeRoot: {
    width: '476px',
    margin: theme.spacing(3)
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
    justifyContent: 'space-around',
    paddingBottom: '5px'
  },
  detailButton: {
    marginLeft: '0',
    marginRight: '0',
    width: '200px',
    height: '45px'
  },
  instructions: {
    color: 'rgba(29, 85, 97, 1)',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '17px',
    letterSpacing: '0.045em',
    paddingBottom: '25px'
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
