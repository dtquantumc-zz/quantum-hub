// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import { cardHeader, cardTitle } from '../../material-kit-react.js'

const descriptionCardStyle = theme => ({
  container: {
    width: 'calc(((1140px - (462.047px + 2 * 8px)) / 2) - 2 * 8px)',
    margin: theme.spacing(1)
  },
  descriptionCard: {
    marginTop: '30px'
  },
  form: {
    margin: '0'
  },
  cardHeader,
  cardTitle
})

export default descriptionCardStyle
