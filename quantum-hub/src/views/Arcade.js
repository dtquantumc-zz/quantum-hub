// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'
import Fade from 'react-reveal/Fade'

import ArcadeHero from '../components/Arcade/ArcadeHero.js'
import SectionTech from '../components/Arcade/SectionTech.js'
import SectionPuzzles from '../components/Arcade/SectionPuzzles.js'
import SectionPoints from '../components/Arcade/SectionPoints.js'
import Download from '../components/Arcade/Download.js'

import { makeStyles } from '@material-ui/core/styles'
import styles from '../assets/jss/material-kit-react/views/home.js'

function Arcade() {
  const useStyles = makeStyles(styles)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Fade delay={350}>
        <ArcadeHero />
        <SectionTech />
        <SectionPuzzles />
        <SectionPoints />
        <Download />
      </Fade>
    </div>
  )
}

export default Arcade