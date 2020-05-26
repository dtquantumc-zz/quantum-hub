// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'

import UBC from '../../images/ubc-logo-2018-crest-blue-rgb72.svg'
import supercluster from '../../images/DTS_Dark_00.svg'
import geeringupLogo from '../../images/GU_Icon_Blue.svg'

// core components
import Button from '../../components/CustomButtons/Button.js'

import styles from '../../assets/jss/material-kit-react/components/footerLinksStyle.js'

const useStyles = makeStyles(styles)

export default function FooterLinks () {
  const classes = useStyles()

  const ubcTitle = 'UBC'
  const ubcLink = 'https://www.ubc.ca/'
  const ubcDescription = 'Image of the UBC crest'

  const superclusterTitle = 'Digital Supercluster'
  const superclusterLink =
    'https://www.digitalsupercluster.ca/programs/capacity-building-program/diversifying-talent-in-quantum-computing/'
  const superclusterDescription = 'Image of Digital Technology Supercluster\'s logo'

  const geeringupTitle = 'UBC Geering Up'
  const geeringupLink = 'https://geeringup.apsc.ubc.ca/'
  const geeringupDescription = 'Image of Geering Up\'s logo'

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Tooltip
          id='ubc-tooltip'
          title={ubcTitle}
          placement={window.innerWidth > 959 ? 'top' : 'left'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color='transparent'
            href={ubcLink}
            target='_blank'
            className={classes.navLink}
          >
            <img src={UBC} alt={ubcDescription} style={{ height: '42px' }} />
          </Button>
        </Tooltip>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Tooltip
          id='supercluster-tooltip'
          title={superclusterTitle}
          placement={window.innerWidth > 959 ? 'top' : 'left'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color='transparent'
            href={superclusterLink}
            target='_blank'
            className={classes.navLink}
          >
            <img src={supercluster} alt={superclusterDescription} style={{ height: '42px' }} />
          </Button>
        </Tooltip>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Tooltip
          id='geeringup-tooltip'
          title={geeringupTitle}
          placement={window.innerWidth > 959 ? 'top' : 'left'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color='transparent'
            href={geeringupLink}
            target='_blank'
            className={classes.navLink}
          >
            <img src={geeringupLogo} alt={geeringupDescription} style={{ height: '42px' }} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  )
}
