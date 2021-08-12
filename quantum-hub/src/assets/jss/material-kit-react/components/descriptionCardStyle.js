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
  cardTitle,
  accordion: {
    borderTop: '0.5px solid #E0E0E0',
    borderBottom: '0.5px solid #E0E0E0'
  },
  accordionTitleContainer: {
    height: '35px',
    padding: '0px'
  },
  accordionTitle: {
    color: '#C3872B',
    margin: '0.875rem 0',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '16px',
    letterSpacing: '0.008em',
    fontFamily: '"Roboto", "Times New Roman", serif'
  },
  descriptionTextContainer: {
    borderTop: '0.5px solid #E0E0E0',
    borderBottom: '0.5px solid #E0E0E0',
    padding: '8px 0px'
  },
  descriptionText: {
    margin: '20px 0px 0px'
  }
})

export default descriptionCardStyle
