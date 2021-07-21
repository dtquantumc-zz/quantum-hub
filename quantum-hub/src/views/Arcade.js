// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import ArcadeHero from '../components/Arcade/ArcadeHero.js'

import { makeStyles } from '@material-ui/core/styles'
import styles from '../assets/jss/material-kit-react/views/home.js'

function Arcade() {
  const useStyles = makeStyles(styles)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ArcadeHero />
    </div>
  )
}

export default Arcade