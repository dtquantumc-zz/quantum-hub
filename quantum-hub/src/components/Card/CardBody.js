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
import styles from '../../assets/jss/material-kit-react/components/cardBodyStyle.js'

const useStyles = makeStyles(styles)

export default function CardBody (props) {
  const classes = useStyles()
  const { className, children, ...rest } = props
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [className]: className !== undefined
  })
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  )
}

CardBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}
