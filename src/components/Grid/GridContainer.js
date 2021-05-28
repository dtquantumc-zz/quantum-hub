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
// nodejs library to set properties for components
import PropTypes from 'prop-types'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = {
  grid: {
    marginRight: '-15px',
    marginLeft: '-15px',
    width: 'auto'
  }
}

const useStyles = makeStyles(styles)

export default function GridContainer (props) {
  const classes = useStyles()
  const { children, className, ...rest } = props
  return (
    <Grid container {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  )
}

GridContainer.defaultProps = {
  className: ''
}

GridContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}
