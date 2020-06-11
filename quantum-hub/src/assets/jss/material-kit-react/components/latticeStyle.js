// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

// const hexWidth = 80

const latticeStyle = theme => ({
  latticeRoot: {
    width: '476px',
    margin: theme.spacing(1)
  },
  // latticeGraphBox: {
  //   width: '100%',
  //   paddingBottom: '80%',
  //   margin: '0'
  // },
  // hexGrid: {
  //   display: 'block',
  //   overflow: 'auto',
  //   position: 'relative',
  //   top: '0',
  //   margin: '0',
  //   height: '100%',
  //   width: '100%'
  // },
  // hexRow: {
  //   margin: '0',
  //   '&:nth-child(odd)': {
  //     marginTop: (-hexWidth / (2 * 1.73205080757) - 4) + 'px'
  //   },
  //   '&:nth-child(even)': {
  //     marginLeft: hexWidth / 2.0 + 'px',
  //     marginTop: (-hexWidth / (2 * 1.73205080757) - 4) + 'px'
  //   },
  //   '&:nth-child(1)': {
  //     marginTop: '0'
  //   }
  // },
  // hexagon: {
  //   width: hexWidth + 'px'
  // },
  latticeInput: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1)
    }
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
    textAlign: 'center'
  },
  dialogContent: {
    ' & > *': {
      width: 'max-content',
      display: 'inline-block'
    }
  }
})

export default latticeStyle
