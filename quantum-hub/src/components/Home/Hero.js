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

import Button from '../CustomButtons/Button.js'
import styles from '../../assets/jss/material-kit-react/views/home.js'

const useStyles = makeStyles(styles)

export default function Hero () {
  const classes = useStyles()
  
  const heroTitle1 = "Welcome to the" 
  const heroTitle2 = "DTQC Quantum Hub"
  const heroSubtitle = "A powerful gallery of web applications that run on a real quantum computer! Engage with quantum computing in an accessible, gamified way. Each application runs on D-Wave's 5000-qubit quantum annealers, providing you with the optimal solutions."

  const dtqcLink = 'https://quantumcomputing.ubc.ca/education/k-12-education'

  return (
      <section className={classes.heroContainer}>
        <Grid container direction="column" className={classes.hero}>
          <Grid item xs={12}>
            <Fade delay={550}>
              <h1 className={classes.heroHeading}>
                {heroTitle1}
                <br/>
                {heroTitle2}
              </h1>
            </Fade>
          </Grid>
          <Grid item xs={12}>
            <Fade delay={850}>
              <p className={classes.heroSubheading}>{heroSubtitle}</p>
            </Fade>
          </Grid>
          <Grid item xs={12} className={classes.buttonContainer}>
            <Fade delay={1250}>
              <Button
                href={dtqcLink}
                target='_blank'
                className={classes.detailButton}
                color='geeringupPrimary'
                round
                >
                Learn More
              </Button>
            </Fade>
          </Grid>
        </Grid>
      </section>
  )
}