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

/*eslint-disable*/
import React from "react"
import { Link } from 'react-router-dom'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Button from '@material-ui/core/Button'

// @material-ui/icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// core components
import widgetList from '../Widget/widgetList'

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js"

const useStyles = makeStyles(styles);

export default function RightHeaderLinks(props) {
  const classes = useStyles();

  const gamesDropdownMobile =
    <Accordion
      className={classes.accordion}
      elevation={0}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={classes.icons} />}
        className={classes.accordionSummary}>
        <Button
          className={classes.rightNavLink}
        >
          Games
        </Button>
      </AccordionSummary>
      <AccordionDetails
        className={classes.accordionDetails}>
        <List className={classes.list}>
          {Object.keys(widgetList).map((widget) => {
            if (widgetList[widget].visible === false) return ''
            return (
              <ListItem
                key={widget}
                className={classes.menuItem}
              >
                <Link
                    to={{ pathname: widgetList[widget].route }}
                    onClick={() => { props.handleDrawerToggle() }}
                    className={classes.dropdownLink}
                >
                    {widgetList[widget].brand}
                </Link>
              </ListItem>
            )
          })}
        </List>
      </AccordionDetails>
    </Accordion>

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {gamesDropdownMobile}
      </ListItem>
    </List>
  );
}
