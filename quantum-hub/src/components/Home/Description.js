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

import quantumComputer from '../../images/d_wave_039.jpg'

import styles from '../../assets/jss/material-kit-react/views/home.js'

const useStyles = makeStyles(styles)

export default function Description () {
  const classes = useStyles()
  
  const subheading = "What is a Quantum Computer?"
  const descriptionText = "A quantum computer leverages the unique properties of quantum mechanics to perform computations, simulate nature, and attack problems like encryption, searching, and optimization more efficiently than their classical counterparts. Analogous to classical bits, quantum bits are the smallest unit of information in a quantum computer. Unlike classical bits, they are not limited to being a 0 or a 1, rather they can be in a superposition of 0 and 1 - in other words they can exist in a combination of both states. This special property, along with entanglement empower quantum computers to address problems in a unique way, with the power to transform many industries."
  const imageCredit = "Image by Larry Goldstein via "

  return (
      <section className={classes.descriptionContainer}>
        <Grid container justifyContent='center' alignItems='center' align='center'>
          <Grid item xs={10} sm={9} md={8} lg={5} xl={4} className={classes.gridItemLeft}>
            <img src={quantumComputer} alt='D-Wave Quantum Computer' className={classes.image} />
            <p className={classes.caption}>{imageCredit}<a href="https://larrygoldstein.pixieset.com/d_wave/" target='_blank' rel='noopener noreferrer'>Pixieset</a></p>
          </Grid>
          <Grid item xs={10} sm={9} md={8} lg={4} xl={3} className={classes.gridItemRight}>
            <h1 className={classes.subheadingBlue}>{subheading}</h1>
            <p className={classes.descriptionText}>{descriptionText}</p>
          </Grid>
        </Grid>
      </section>
  )
}