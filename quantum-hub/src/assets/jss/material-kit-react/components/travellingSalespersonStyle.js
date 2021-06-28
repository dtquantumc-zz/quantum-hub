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
      margin: theme.spacing(3),
      boxShadow: 'none'
    }
  },
  mapContainer: {
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
  loadingContainer: {
    position: 'relative',
    margin: 'auto',
    width: '100%',
    opacity: '0.65'
  },
  mapProgress: {
    position: 'absolute',
    bottom: 'calc((380.48px / 2) - (68px / 2))',
    left: 'calc((492px / 2) - (68px / 2))',
    color: '#50c8eb',
    /**
     * NOTE: This zIndex value is selected so it is
     * higher than the highest zIndex on Map.js
     * which is the 'customPopupPane' at 3000 (set
     * in TSPutils.js)
     */
    zIndex: '4000'
  },
  hidingContainer: {
    display: 'none'
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
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between'
    },
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  detailButton: {
    marginLeft: '0',
    marginRight: '0',
    width: '145px',
    height: '45px',
    [theme.breakpoints.down('sm')]: {
      width: '105px',
      height: '35px'
    }
  },
  dialogContent: {
    overflowY: 'hidden'
  }
})

export default travellingSalespersonStyle
