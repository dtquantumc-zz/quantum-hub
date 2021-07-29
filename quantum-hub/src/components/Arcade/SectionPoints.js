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

import points from '../../images/app_points.svg'

import styles from '../../assets/jss/material-kit-react/views/arcade.js'

const useStyles = makeStyles(styles)

export default function SectionPoints () {
  const classes = useStyles()

  const headingText = "Earn points and get rewards"
  const bodyText = "Redeem points earned through gameplay to receive tickets that can be used to access the in-app quantum computer."
  
  return (
      <section className={classes.section}>
        <Grid container className={classes.gridContainer} alignItems='center' justifyContent='space-between' align='center'>
          <Grid item xs={12} sm={6} lg={5} className={classes.gridItemLeft}>
            <Fade delay={550}>
              <img src={points} alt='Quantum Arcade Puzzles' className={classes.largeImageBlock} />
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6} xl={6} className={classes.gridItemRight}>
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