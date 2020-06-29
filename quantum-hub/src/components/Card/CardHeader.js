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
// nodejs library that concatenates classes
import classNames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// @material-ui/icons

// core components
import styles from '../../assets/jss/material-kit-react/components/cardHeaderStyle.js'

const useStyles = makeStyles(styles)

export default function CardHeader (props) {
  const classes = useStyles()
  const { className, children, color, plain, ...rest } = props
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + 'CardHeader']]: color,
    [classes.cardHeaderPlain]: plain,
    [className]: className !== undefined
  })
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  )
}

CardHeader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(['warning', 'success', 'danger', 'info', 'primary', 'geeringupSecondary']),
  plain: PropTypes.bool,
  children: PropTypes.node
}
