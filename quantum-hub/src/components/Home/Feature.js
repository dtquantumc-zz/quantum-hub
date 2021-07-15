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

import appMockup from '../../images/app_mockup.png'

import styles from '../../assets/jss/material-kit-react/views/home.js'

const useStyles = makeStyles(styles)

export default function Feature () {
  const classes = useStyles()
  
  const subheading = "Quantum Arcade Mobile Application"
  const descriptionText = "Quantum Arcade is an educational cross-platform mobile application that introduces the general public to quantum computing in a gamified way. Test your mental skills with optimization-based puzzle games, and if you get stuck, you can ask a quantum computer to solve the puzzle for you!"
  const iosLink = "https://testflight.apple.com/join/FEkCriwb"
  const androidLink = "https://drive.google.com/file/d/1UHmBISGQhBeF3n1feego2Cloy0zErajy/view?usp=sharing"

  return (
      <section className={classes.featureContainer}>
        <Grid container justifyContent='center' alignItems='flex-start' align='center'>
          <Grid item xs={12} sm={6} className={classes.featureDescription}>
            <h1 className={classes.subheadingBlue}>{subheading}</h1>
            <p className={classes.descriptionText}>{descriptionText}</p>
            <p className={classes.linkText}>Test Beta on <a href={iosLink} target='_blank' rel='noopener noreferrer' className={classes.links}>iOS</a> or <a href={androidLink} target='_blank' rel='noopener noreferrer' className={classes.links}>Android</a></p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img src={appMockup} alt='Quantum Arcade Mobile App' className={classes.featureImage} />
          </Grid>
        </Grid>
      </section>
  )
}