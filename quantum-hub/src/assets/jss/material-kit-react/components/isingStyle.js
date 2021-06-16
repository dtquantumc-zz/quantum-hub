// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

// const hexWidth = 80

const IsingStyle = theme => ({
  isingRoot: {
    [theme.breakpoints.up('md')]: {
      width: '470px'
    },
    [theme.breakpoints.up('lg')]: {
      width: '540px'
    },
    [theme.breakpoints.up('xl')]: {
      width: '600px'
    },
    margin: theme.spacing(3)
  },
  isingInput: {
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
    marginRight: '0',
    marginTop: '0',
    marginBottom: '0',
    width: '145px',
    height: '45px'
  },
  instructions: {
    color: 'rgba(0, 0, 0, 0.87)',
    textAlign: 'center',
    letterSpacing: '0.045em'
  },
  dialogContent: {
    ' & > *': {
      width: 'max-content',
      display: 'inline-block'
    }
  },
  isingProgress: {
    position: 'absolute',
    bottom: 'calc((307px / 2) - (68px / 2))',
    left: 'calc(50% - (68px / 2))',
    color: '#50c8eb'
  }
})

export default IsingStyle
