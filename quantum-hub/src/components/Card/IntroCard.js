// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Hidden from '@material-ui/core/Hidden'

import Card from './Card.js'
import CardBody from './CardBody'

import widgetList from '../Widget/widgetList'
import Button from '@material-ui/core/Button'
import styles from '../../assets/jss/material-kit-react/components/introCardStyle.js'

const useStyles = makeStyles(styles)

export default function IntroCard (props) {
  const classes = useStyles()

  const [appMenuAnchor, setAppMenuAnchor] = React.useState(null)

  const widgetInfo = props.widget ? widgetList[props.widget] : widgetList.default

  const handleAppMenuClick = (event) => {
    setAppMenuAnchor(event.currentTarget)
  }
  const handleAppMenuClose = () => {
    setAppMenuAnchor(null)
  }

  const { brand, setWidget, loading } = props

  const brandComponent =
    <>
      <Button
        className={classes.title}
        onClick={handleAppMenuClick}
        disabled={!props.isMobile}
      >
        {brand}
        {loading ? '' : (
          <>
            <Hidden smUp implementation='css'>
                <ExpandMoreIcon
                    style={{ fontSize: 40 }}
                />
            </Hidden>
            <div className={classes.lPad} />
          </>
        )}
      </Button>
      <Menu
        disabled={loading}
        id='AppMenu'
        // variant='temporary'
        anchorEl={appMenuAnchor}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={Boolean(appMenuAnchor)}
        onClose={handleAppMenuClose}
        keepMounted
      >
        {Object.keys(widgetList).map((widget) => {
          if (widgetList[widget].visible === false) return ''
          return (
            <MenuItem
              key={widget}
              onClick={() => {
                setWidget(widget)
                handleAppMenuClose()
              }}
            >
              {widgetList[widget].brand}
            </MenuItem>
          )
        })}
      </Menu>
    </>

  return (
    <Card className={classes.descriptionCard}>
        <CardBody>
            <h4 className={classes.title}>{brandComponent}</h4>
            <p className={classes.introText}>{widgetInfo.introText}</p>
        </CardBody>
    </Card>
  )
}
