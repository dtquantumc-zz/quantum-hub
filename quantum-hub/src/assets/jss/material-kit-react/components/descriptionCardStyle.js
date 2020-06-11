// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import { cardTitle } from '../../material-kit-react.js'

const descriptionCardStyle = theme => ({
  container: {
    width: 'calc(((1140px - (462.047px + 2 * 8px)) / 2) - 2 * 8px)',
    margin: theme.spacing(1)
  },
  descriptionCard: {
    marginTop: '0',
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.12)'
  },
  form: {
    margin: '0'
  },
  cardTitle
})

export default descriptionCardStyle
