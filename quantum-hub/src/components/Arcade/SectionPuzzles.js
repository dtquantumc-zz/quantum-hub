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

import puzzles from '../../images/app_games.svg'

import styles from '../../assets/jss/material-kit-react/views/arcade.js'

const useStyles = makeStyles(styles)

export default function SectionPuzzles () {
  const classes = useStyles()

  const headingText = "Test your mental skills"
  const bodyText = "Exercise your mind with optimization-based puzzles. If you get stuck, ask a quantum computer to solve it for you in real time."
  
  return (
      <section className={classes.sectionGrey}>
        <Grid container className={classes.puzzlesGridContainer} alignItems='center' justifyContent='space-between' align='center'>
          <Grid item xs={12} sm={6} lg={5}>
            <div className={classes.textBlock}>
              <h1 className={classes.headingText}>
              {headingText}
              </h1>
              <p className={classes.bodyText}>{bodyText}</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} xl={6}>
            <img src={puzzles} alt='Quantum Arcade Puzzles' className={classes.imageBlock} />
          </Grid>
        </Grid>
      </section>
  )
}