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
import ArcadeButtons from './ArcadeButtons'
import Button from '../CustomButtons/Button.js'
// @material-ui/core components
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import MailOutlineIcon from '@material-ui/icons/MailOutline'
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

  const mailingListLink = "https://ubc.ca1.qualtrics.com/jfe/form/SV_bxrzDqMxEMzEB0i"

  return (
      <section className={classes.heroContainer}>
        <Grid container className={classes.hero}>
          <Grid item xs={12} md={5}>
            <h1 className='hero_heading'>
              {heroTitle1}
              <br/>
              {heroTitle2}
            </h1>
            <p className={classes.heroSubheading}>{heroSubtitle}</p>
            <p className={classes.comingSoonText}>Be the first to know when Quantum Arcade launches.</p>
            <Button
                href={mailingListLink}
                target='_blank'
                className={classes.detailButton}
                color='quantumArcadePurple'
                round
              >
                <MailOutlineIcon style={{ height: '24px', paddingRight: '0.5em' }} />
                Sign Up
              </Button>
            {/* <ArcadeButtons/> */}
          </Grid>
          <Grid item xs={12} md={7}>
            <Fade delay={550}>
              <img src={appMockup} alt='Quantum Arcade Mobile App' className={classes.heroImage} />
            </Fade>
          </Grid>
        </Grid>
      </section>
  )
}