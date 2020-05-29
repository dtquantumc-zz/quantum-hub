// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

const nurseStyle = theme => ({
  nurseRoot: {
    width: '476px',
    margin: theme.spacing(1),
    '& > *': {
      color: 'rgba(0, 0, 0, 0.87)'
    }
  },
  nurseInput: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
})

export default nurseStyle
