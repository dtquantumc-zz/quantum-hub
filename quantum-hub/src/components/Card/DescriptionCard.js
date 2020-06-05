// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Card from './Card.js'
import CardBody from './CardBody'

import GridContainer from '../Grid/GridContainer.js'
import GridItem from '../Grid/GridItem'

import widgetList from '../Widget/widgetList.js'
import Button from '../CustomButtons/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import styles from '../../assets/jss/material-kit-react/components/descriptionCardStyle.js'
const useStyles = makeStyles(styles)

export default function DescriptionCard (props) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [scroll, setScroll] = React.useState('paper')
  const descriptionElementRef = React.useRef(null)

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const handleClickOpen = (scrollType) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const widgetInfo = !!props.widget ? widgetList[props.widget] : widgetList.default

  return (
    <GridContainer className={classes.container} justify='center'>
      <GridItem>
        <Card className={classes.descriptionCard}>
          <form className={classes.form}>
            <CardBody>
              <h4 className={classes.cardTitle}>{widgetInfo.title}</h4>
              {widgetInfo.briefDescriptionText}
              <Button color='geeringupSecondary' onClick={handleClickOpen('paper')}>Read More</Button>
            </CardBody>
          </form>
        </Card>
      </GridItem>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>Instructions</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}
          >
          {widgetInfo.readMoreDescriptionText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='geeringupSecondary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
  )
}
