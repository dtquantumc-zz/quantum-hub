// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Card from './Card.js'
import CardBody from './CardBody'

// import GridContainer from '../Grid/GridContainer.js'
// import GridItem from '../Grid/GridItem'

import widgetList from '../Widget/widgetList.js'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

// @material-ui/icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import styles from '../../assets/jss/material-kit-react/components/descriptionCardStyle.js'
const useStyles = makeStyles(styles)

export default function DescriptionCard (props) {
  const classes = useStyles()

  const widgetInfo = props.widget ? widgetList[props.widget] : widgetList.default

  return (
    <div className={classes.container} justify='center'>
      <Card className={classes.descriptionCard}>
        <form className={classes.form}>
          <CardBody>
            <h4 className={classes.cardTitle}>Game Overview</h4>
            {widgetInfo.briefDescriptionText}
          </CardBody>
        </form>
      </Card>
      <Accordion
        square
        className={classes.accordion}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={classes.icons} />}
          className={classes.accordionTitleContainer}
        >
          <h4 className={classes.accordionTitle}>Additional Information</h4>
        </AccordionSummary>
        <AccordionDetails className={classes.descriptionTextContainer}>
          <div className={classes.descriptionText}>
            {widgetInfo.readMoreDescriptionText}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
