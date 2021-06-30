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
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles'

import Button from '../CustomButtons/Button.js'
import styles from '../../assets/jss/material-kit-react/views/home.js'

const useStyles = makeStyles(styles)

export default function Hero () {
  const classes = useStyles()

  const dtqcLink = 'https://quantumcomputing.ubc.ca/education/k-12-education'

  return (
      <section className={classes.heroContainer}>
        <Fade direction="right" in={true} timeout={4000} mountOnEnter unmountOnExit>
            <Grid container direction="column" className={classes.hero}>
                <Grid item xs={12}><h1 className={classes.heroHeading}>Welcome to the <br /> DTQC Quantum Hub</h1></Grid>
                <Grid item xs={12}><p className={classes.heroSubheading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus ut pellentesque nisl pretium blandit aliquam senectus adipiscing. Mi scelerisque aliquam sapien, cum ultrices nunc.</p></Grid>
                <Grid item xs={12} className={classes.buttonContainer}>
                  <Button
                    href={dtqcLink}
                    target='_blank'
                    className={classes.detailButton}
                    color='geeringupPrimary'
                    round
                    >
                    Learn More
                  </Button>
                </Grid>
            </Grid>
        </Fade>
      </section>
  )
}