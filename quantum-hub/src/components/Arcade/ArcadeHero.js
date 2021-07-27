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
import ArcadeButtons from './ArcadeButtons'
// @material-ui/core components
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles'

import appMockup from '../../images/app_mockup_group.png'

import styles from '../../assets/jss/material-kit-react/views/arcade.js'

// styling
import './component_css/heroHeading.css'

const useStyles = makeStyles(styles)

export default function ArcadeHero () {
  const classes = useStyles()
  
  const heroTitle1 = "Quantum" 
  const heroTitle2 = "Arcade"
  const heroSubtitle = "Feel the power of a quantum computer in the palm of your hand."

  return (
      <section className={classes.heroContainer}>
        <Fade direction="right" in={true} timeout={4000} mountOnEnter unmountOnExit>
            <Grid container direction="column" className={classes.hero}>
                <Grid item xs={12} md={5}>
                  <h1 className='hero_heading'>
                    {heroTitle1}
                    <br/>
                    {heroTitle2}
                  </h1>
                  <p className={classes.heroSubheading}>{heroSubtitle}</p>
                  {/* <ArcadeButtons/> */}
                </Grid>
                <Grid item xs={12} md={7}>
                  <img src={appMockup} alt='Quantum Arcade Mobile App' className={classes.heroImage} />
                </Grid>
            </Grid>
        </Fade>
      </section>
  )
}