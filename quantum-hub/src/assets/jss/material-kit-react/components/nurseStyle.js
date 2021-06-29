// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

const nurseStyle = theme => ({
  nurseRoot: {
    [theme.breakpoints.down('md')]: {
      width: '330px'
    },
    [theme.breakpoints.up('md')]: {
      width: '470px'
    },
    [theme.breakpoints.up('lg')]: {
      width: '540px'
    },
    [theme.breakpoints.up('xl')]: {
      width: '600px'
    },
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1)
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
    display: 'flex',
    marginTop: '25px',
  },
  detailButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '200px',
    height: '45px',
    [theme.breakpoints.down('md')]: {
      height: '35px'
    }
  },
  instructions: {
    color: 'rgba(29, 85, 97, 1)',
    textAlign: 'center',
    padding: '0.9375rem',
    paddingBottom: '0',
    fontSize: '16px',
    fontWeight: '600',
    letterSpacing: '0.045em'
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
