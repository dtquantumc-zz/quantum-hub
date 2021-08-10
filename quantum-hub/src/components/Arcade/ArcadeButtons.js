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
import { makeStyles } from '@material-ui/core/styles'

import appleLogo from '../../images/apple_logo.svg'
import playLogo from '../../images/google_play_logo.svg'

import Button from '../CustomButtons/Button.js'
import styles from '../../assets/jss/material-kit-react/views/arcade.js'

const useStyles = makeStyles(styles)

export default function ArcadeButtons () {
  const classes = useStyles()

  const iosLink = "https://testflight.apple.com/join/FEkCriwb"
  const iosText = "iOS Beta"
  
  const androidLink = "https://drive.google.com/file/d/1UHmBISGQhBeF3n1feego2Cloy0zErajy/view?usp=sharing"
  const androidText = "Android Beta"

  return (
      <>
        <Button
          href={iosLink}
          target='_blank'
          className={classes.detailButton}
          color='quantumArcadePurple'
          round
        >
          <img src={appleLogo} alt='Apple App Store' style={{ height: '20px', paddingRight: '0.7em' }} />
          {iosText}
        </Button>
        <Button
          href={androidLink}
          target='_blank'
          className={classes.detailButton}
          color='quantumArcadePurple'
          round
        >
          <img src={playLogo} alt='Google Play Store' style={{ height: '24px', paddingRight: '0.7em' }} />
          {androidText}
        </Button>
    </>
  )
}