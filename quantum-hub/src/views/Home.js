// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

import Hero from '../components/Home/Hero.js'
import Description from '../components/Home/Description.js'
import GamesSlider from '../components/Home/GamesSlider.js'
import Feature from '../components/Home/Feature.js'
import Resources from '../components/Home/Resources.js'

import { makeStyles } from '@material-ui/core/styles'
import styles from '../assets/jss/material-kit-react/views/home.js'

function Home() {
  const useStyles = makeStyles(styles)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Hero />
      <Description />
      <GamesSlider />
      <Feature />
      <Resources />
    </div>
  )
}

export default Home