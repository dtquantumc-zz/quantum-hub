// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// core components
import Button from "../../components/CustomButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

import dtqcLogo from "../../images/DTQC_with_background.svg"

const useStyles = makeStyles(styles);

export default function LeftHeaderLinks() {
  const classes = useStyles();

  const dtqcTitle = "More info about DTQC"
  const dtqcLink = "https://quantumcomputing.ubc.ca/education/k-12-education"

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="dtqc-tooltip"
          title={dtqcTitle}
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href={dtqcLink}
            target='_blank'
            className={classes.navLink}
          >
            <img src={dtqcLogo} style={{ height: '32px', borderRadius: '3px'}}/>
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
