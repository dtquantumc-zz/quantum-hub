/*!

 =========================================================
 * Material Kit React - v1.8.0 based on Material Kit - v2.0.2
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-kit-react
 * Copyright 2019 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-kit-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

import React from 'react'
// @material-ui/core components
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import styles from '../../assets/jss/material-kit-react/views/home.js'

const useStyles = makeStyles(styles)

export default function Resources () {
  const classes = useStyles()
  
  const subheading = "Quantum Computing Resources"
  const wikiLink = "http://wiki.quantumoutreach.ca"
  const dtqcLink = "http://quantum-bc.ca/learn/diversifying-talent-in-quantum-computing/"
  const quantumGameLink = "https://quantumgame.io/"
  const scratchLink = "https://scratch.mit.edu/studios/27046227/"

  return (
      <section className={classes.resourcesContainer}>
        <Grid container alignItems='center' spacing={4}>
          <Grid item xs={12} sm={6}>
            <h1 className={classes.subheadingYellow}>{subheading}</h1>
          </Grid>
          <Grid item xs={6} sm={3}>
            <p className={classes.resourceLinkText}><a href={wikiLink} target='_blank' rel='noopener noreferrer' className={classes.resourceLinks}>Quantum Computing Educational Wiki</a></p>
          </Grid>
          <Grid item xs={6} sm={3}>
            <p className={classes.resourceLinkText}><a href={dtqcLink} target='_blank' rel='noopener noreferrer' className={classes.resourceLinks}>Diversifying Talent In Quantum Computing</a></p>
          </Grid>
        </Grid>
        <Grid container alignItems='center' spacing={4}>
          <Grid item xs={12} sm={6}>
          </Grid>
          <Grid item xs={6} sm={3}>
            <p className={classes.resourceLinkText}><a href={quantumGameLink} target='_blank' rel='noopener noreferrer' className={classes.resourceLinks}>Quantum Mechanics Puzzle Game</a></p>
          </Grid>
          <Grid item xs={6} sm={3}>
            <p className={classes.resourceLinkText}><a href={scratchLink} target='_blank' rel='noopener noreferrer' className={classes.resourceLinks}>Quantum Computing in Scratch</a></p>
          </Grid>
        </Grid>
      </section>
  )
}