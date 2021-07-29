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
import Fade from 'react-reveal/Fade'
// @material-ui/core components
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import quantumPhysics from '../../images/quantum_physics.svg'

import styles from '../../assets/jss/material-kit-react/views/arcade.js'

const useStyles = makeStyles(styles)

export default function SectionTech () {
  const classes = useStyles()

  const headingText = "Experience emerging tech"
  const bodyText = "Quantum computing is an exciting, but complex field to enter. Quantum Arcade makes it easy for anyone to interact with a real quantum computer!"
  
  return (
      <section className={classes.section}>
        <Grid container className={classes.gridContainer} alignItems='center' justifyContent='space-between' align='center'>
          <Grid item xs={12} sm={6} lg={6} className={classes.gridItemLeft}>
            <Fade delay={550}>
              <img src={quantumPhysics} alt='Quantum Physics' className={classes.imageBlock} />
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6} xl={5} className={classes.gridItemRight}>
            <div className={classes.textBlock}>
              <h1 className={classes.headingText}>
              {headingText}
              </h1>
              <p className={classes.bodyText}>{bodyText}</p>
            </div>
          </Grid>
        </Grid>
      </section>
  )
}