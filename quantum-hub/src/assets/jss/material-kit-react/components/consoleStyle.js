// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

const consoleStyle = theme => ({
  console: {
    width: 'calc(((1140px - (462.047px + 2 * 8px)) / 2) - 2 * 8px)',
    margin: theme.spacing(1),
    '& > *': {
      width: 'calc(314.9765px - (2 * 15px))',
      margin: 'auto'
    }
  }
})

export default consoleStyle
