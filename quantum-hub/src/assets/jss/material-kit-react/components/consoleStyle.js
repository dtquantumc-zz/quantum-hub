// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

const consoleStyle = theme => ({
  console: {
    [theme.breakpoints.up('md')]: {
      width: '340px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '440px',
    },
    margin: theme.spacing(3)
    // '& > *': {
    //   // width: 'calc(314.9765px - (2 * 15px))',
    //   margin: 'auto'
    // }
  },
  toolbar: {
    minHeight: 30,
    padding: 0,
  },
  consoleButton: {
    padding: 0,
    paddingLeft: 20,
  },
  consoleTitle: {
    paddingRight: 20,
    flexGrow: 1,
  }
})

export default consoleStyle
