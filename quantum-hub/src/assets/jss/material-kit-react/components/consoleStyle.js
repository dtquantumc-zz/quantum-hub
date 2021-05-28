// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

const consoleStyle = theme => ({
  console: {
    width: '340px',
    margin: theme.spacing(1)
    // '& > *': {
    //   // width: 'calc(314.9765px - (2 * 15px))',
    //   margin: 'auto'
    // }
  },
  toolbar: {
    minHeight: 5,
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
