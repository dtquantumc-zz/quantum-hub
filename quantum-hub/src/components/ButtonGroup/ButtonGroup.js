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
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// core components
import widgetList from '../Widget/widgetList'
import styles from '../../assets/jss/material-kit-react/components/buttonGroupStyle.js'
// styling
import './component_css/gameMenu.css'

const useStyles = makeStyles(styles)

export default function GameMenu (props) {
  const classes = useStyles()
  const { setWidget } = props

  return (
    <div className={classes.root}>
      <ButtonGroup
        orientation="vertical"
        color="#E0E0E0"
        aria-label="vertical outlined primary button group"
      >
        <Typography variant="h6" className='menu_title'>
          <Box letterSpacing={3}>
            GAMES
          </Box>
        </Typography>
        {Object.keys(widgetList).map((widget) => {
          if (widgetList[widget].visible === false) return ''
          return (
            <Button
              key={widget}
              onClick={() => {
                setWidget(widget)
              }}
              className={classes.menuItem}
            >
              {widgetList[widget].brand}
            </Button>
          )
        })}
      </ButtonGroup>
    </div>
  );
}