// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

/*eslint-disable*/
import React from "react";
import { Link } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "../../components/CustomButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

import dtqcLogo from "../../images/DTQC_Logo0.svg"

const useStyles = makeStyles(styles);

export default function LeftHeaderLinks() {
  const classes = useStyles();

  return (
    <Button
      color="transparent"
      className={classes.leftNavLink}
    >
      <Link 
        to={{
              pathname: '/',
              state: false,
            }}
      >
        <img src={dtqcLogo} style={{ height: '56px', borderRadius: '3px' }} />
      </Link>
    </Button> 
  );
}
