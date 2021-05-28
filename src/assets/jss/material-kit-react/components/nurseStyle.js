// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

const nurseStyle = theme => ({
  nurseRoot: {
    width: '476px',
    margin: theme.spacing(1)
  },
  nurseInput: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  nurseProgress: {
    position: 'absolute',
    bottom: 'calc((307px / 2) - (68px / 2))',
    left: 'calc((510px / 2) - (68px / 2))',
    color: '#50c8eb'
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
    textAlign: 'center',
    padding: '0.9375rem',
    paddingBottom: '0'
  },
  loading: {
    '&$instructions': {
      color: 'rgba(0, 0, 0, 0.65)'
    }
  },
  dialogContent: {
    ' & > *': {
      width: 'max-content',
      display: 'inline-block'
    }
  }
})

export default nurseStyle
