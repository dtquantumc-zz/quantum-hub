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
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
// @material-ui/core components
import Grid from '@material-ui/core/Grid'
import Button from '../CustomButtons/Button.js'
import { makeStyles } from '@material-ui/core/styles'

import appMockup from '../../images/app_mockup.png'

import styles from '../../assets/jss/material-kit-react/views/home.js'

const useStyles = makeStyles(styles)

export default function Feature () {
  const classes = useStyles()
  
  const subheading = "Quantum Arcade Mobile Application"
  const descriptionText = "Quantum Arcade is an educational cross-platform mobile application that introduces the general public to quantum computing in a gamified way. Test your mental skills with optimization-based puzzle games and, if you get stuck, you can ask a quantum computer to solve the puzzle for you!"
  const arcadeLink = "/arcade"

  return (
      <section className={classes.featureContainer}>
        <Grid container justifyContent='center' alignItems='flex-start' className={classes.gridContainer}>
          <Grid item xs={12} sm={6} className={classes.featureDescription}>
            <h1 className={classes.subheadingBlue}>{subheading}</h1>
            <p className={classes.descriptionText}>{descriptionText}</p>
            <Link
              className={classes.gameLink}
              to={{
                pathname: arcadeLink
                }}
            >
              <Button
                className={classes.smallButton}
                color='geeringupPrimary'
                round
              >
                Learn More
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Fade delay={550}>
              <img src={appMockup} alt='Quantum Arcade Mobile App' className={classes.featureImage} />
            </Fade>
          </Grid>
        </Grid>
      </section>
  )
}