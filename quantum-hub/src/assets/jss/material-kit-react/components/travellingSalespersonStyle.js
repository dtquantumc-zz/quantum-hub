// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

const travellingSalespersonStyle = theme => ({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      boxShadow: 'none'
    }
  },
  mapContainer: {
    width: '492px'
  },
  map: {
    height: '47.61vh',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '6px'
  },
  expandedMap: {
    height: '100%',
    width: '100%',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '6px'
  },
  tspInput: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  dialogContent: {
    overflowY: 'hidden'
  }
})

export default travellingSalespersonStyle
