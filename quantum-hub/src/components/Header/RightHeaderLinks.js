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
import React from "react";
import { Link } from 'react-router-dom'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from '@material-ui/core/MenuItem'

// material-ui-popup-state components and hooks
import Menu from 'material-ui-popup-state/HoverMenu'
import { usePopupState, bindHover, bindMenu } from 'material-ui-popup-state/hooks'

// @material-ui/icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// core components
import Button from '@material-ui/core/Button'
import widgetList from '../Widget/widgetList'

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function RightHeaderLinks() {
  const classes = useStyles();

  const arcadeTitle = "Quantum Arcade"
  const arcadeLink = "/arcade"
  
  const popupState = usePopupState({ variant: 'popover', popupId: 'gamesMenu' })

  const gamesDropdown =
    <>
      <Button
        {...bindHover(popupState)}
        className={classes.rightNavLink}
      >
        Games
        <ExpandMoreIcon className={classes.expandIcon}/>
      </Button>
      <Menu
        {...bindMenu(popupState)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        className={classes.menu}
      >
        {Object.keys(widgetList).map((widget) => {
          if (widgetList[widget].visible === false) return ''
          return (
            <MenuItem
              key={widget}
              className={classes.menuItem}
            >
              <Link
                to={{
                  pathname: widgetList[widget].route
                }}
                onClick={() => {
                  popupState.close
                }}
                className={classes.dropdownLink}
              >
                {widgetList[widget].brand}
              </Link>
            </MenuItem>
          )
        })}
      </Menu>
    </>

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {gamesDropdown}
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
        className={classes.rightNavLink}
        >
          <Link
            to={{ pathname: arcadeLink }}
            className={classes.dropdownLink}
          >
            {arcadeTitle}
          </Link>
        </Button>
      </ListItem>
    </List>
  );
}
