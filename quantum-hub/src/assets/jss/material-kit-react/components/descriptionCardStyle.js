// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import { cardTitle } from '../../material-kit-react.js'

const descriptionCardStyle = theme => ({
  container: {
    // width: 'calc(((1140px - (462.047px + 2 * 8px)) / 2) - 2 * 8px)',
    margin: theme.spacing(3)
  },
  descriptionCard: {
    margin: '0',
    boxShadow: 'none'
  },
  form: {
    margin: '0'
  },
  cardTitle
})

export default descriptionCardStyle
