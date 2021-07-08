// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

const introCardStyle = theme => ({
  descriptionCard: {
    margin: '0',
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
      width: '330px'
    },
    [theme.breakpoints.up('md')]: {
      width: '470px',
      marginTop: theme.spacing(1)
    },
    [theme.breakpoints.up('lg')]: {
      width: '540px',
      marginTop: theme.spacing(1)
    },
    [theme.breakpoints.up('xl')]: {
      width: '600px',
      marginTop: theme.spacing(1)
    }
  },
  introText: {
    color: '#1D5561'
  },
  title: {
    fontFamily: 'Roboto Slab',
    fontWeight: 'bold',
    lineHeight: '30px',
    fontSize: '28px',
    padding: '0px',
    marginTop: theme.spacing(1),
    marginBottom: '0',
    borderRadius: '3px',
    textTransform: 'none',
    color: '#1D5561',
    background: 'transparent',
    letterSpacing: 'unset',
    boxShadow: 'none',
    '&:hover,&:focus,&:disabled': {
      color: '#1D5561',
      boxShadow: 'none',
      background: 'transparent'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '23px',
      letterSpacing: '0.045em'
    }
  }
})

export default introCardStyle
