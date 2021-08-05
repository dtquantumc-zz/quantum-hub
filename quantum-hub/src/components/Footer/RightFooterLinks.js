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

// core components
import Button from '../CustomButtons/Button.js'

import styles from '../../assets/jss/material-kit-react/components/footerLinksStyle.js'

const useStyles = makeStyles(styles)

export default function FooterLinks () {
  const classes = useStyles()

  const githubTitle = "Check out our GitHub"
  const githubLink = "https://github.com/dtquantumc/sw"

  const youtubeTitle = "Subscribe on Youtube"
  const youtubeLink = "https://www.youtube.com/user/GEERingUp"

  const instagramTitle = "Follow us on Instagram"
  const instagramLink = "https://www.instagram.com/geeringup/?hl=en"

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="github-tooltip"
          title={githubTitle}
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href={githubLink}
            target="_blank"
            color="transparent"
            className={classes.socialLink}
          >
            <i className={classes.socialIcons + " fab fa-github"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="youtube-tooltip"
          title={youtubeTitle}
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href={youtubeLink}
            target="_blank"
            className={classes.socialLink}
          >
            <i className={classes.socialIcons + " fab fa-youtube"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title={instagramTitle}
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href={instagramLink}
            target="_blank"
            className={classes.socialLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  )
}
