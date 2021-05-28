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
import { Badge } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import styles from '../../assets/jss/material-kit-react/components/badgeStyle.js'

const useStyles = makeStyles(styles)

export default function CustomBadge (props) {
  const classes = useStyles()
  const { color, children } = props
  return (
    <span className={classes[color]}>{<Badge {...props} />}</span>
  )
}

Badge.defaultProps = {
  color: 'gray'
}

Badge.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'warning',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
    'geeringupSecondary'
  ]),
  children: PropTypes.node
}
