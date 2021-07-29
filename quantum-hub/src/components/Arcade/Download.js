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
import ArcadeButtons from './ArcadeButtons'
import Button from '../CustomButtons/Button.js'
import { makeStyles } from '@material-ui/core/styles'

import appIcon from '../../images/quantum_arcade_app_icon.svg'

import styles from '../../assets/jss/material-kit-react/views/arcade.js'

const useStyles = makeStyles(styles)

export default function Download () {
  const classes = useStyles()

  //const headingText = "Download Now"
  //const bodyText = "Be one of the first to experience the power of our in-app quantum computer by testing the Beta version."
  const headingText = "Launching Soon"
  const bodyText = "Join the mailing list to be the first to know when Quantum Arcade gets released."
  const mailingListLink = "https://ubc.ca1.qualtrics.com/jfe/form/SV_bxrzDqMxEMzEB0i"

  return (
      <section className={classes.sectionDownload}>
        <div className={classes.downloadContainer}>
          <img src={appIcon} alt='Quantum Arcade Puzzles' className={classes.appIcon} width={135} height={135}/>
          <Fade delay={500}>
            <div className={classes.downloadText}>
              <h1 className={classes.downloadHeadingText}>
                {headingText}
              </h1>
              <p className={classes.downloadBodyText}>{bodyText}</p>
              <Button
                href={mailingListLink}
                target='_blank'
                className={classes.detailButton}
                color='quantumArcadePurple'
                round
              >
                Get on the List
              </Button>
              {/* <ArcadeButtons/> */}
            </div>
          </Fade>
        </div>
      </section>
  )
}