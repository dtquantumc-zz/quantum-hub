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

import appMockup from '../../images/app_mockup_group.png'
import appleLogo from '../../images/apple_logo.svg'
import playLogo from '../../images/google_play_logo.svg'

import Button from '../CustomButtons/Button.js'
import styles from '../../assets/jss/material-kit-react/views/arcade.js'

// styling
import './component_css/heroHeading.css'

const useStyles = makeStyles(styles)

export default function ArcadeHero () {
  const classes = useStyles()
  
  const heroTitle1 = "Quantum" 
  const heroTitle2 = "Arcade"
  const heroSubtitle = "Feel the power of a quantum computer in the palm of your hand."

  const iosLink = "https://testflight.apple.com/join/FEkCriwb"
  const androidLink = "https://drive.google.com/file/d/1UHmBISGQhBeF3n1feego2Cloy0zErajy/view?usp=sharing"

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
                  <Button
                    href={iosLink}
                    target='_blank'
                    className={classes.detailButton}
                    color='quantumArcadePurple'
                    round
                    >
                    <img src={appleLogo} style={{ height: '20px', paddingRight: '0.7em' }} />
                    iOS Beta
                  </Button>
                  <Button
                    href={androidLink}
                    target='_blank'
                    className={classes.detailButton}
                    color='quantumArcadePurple'
                    round
                    >
                    <img src={playLogo} style={{ height: '24px', paddingRight: '0.7em' }} />
                    Android Beta
                  </Button>
                </Grid>
                <Grid item xs={12} md={7}>
                  <img src={appMockup} alt='Quantum Arcade Mobile App' className={classes.heroImage} />
                </Grid>
            </Grid>
        </Fade>
      </section>
  )
}