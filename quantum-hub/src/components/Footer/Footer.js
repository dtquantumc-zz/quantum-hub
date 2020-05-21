/*eslint-disable*/
import React from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// nodejs library that concatenates classes
import classNames from 'classnames'
// material-ui core components
import { makeStyles } from '@material-ui/core/styles'

import styles from '../../assets/jss/material-kit-react/components/footerStyle.js'

const useStyles = makeStyles(styles)

export default function Footer (props) {
  const classes = useStyles()
  const { whiteFont, leftLinks } = props
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  })

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          {leftLinks}
        </div>
        <div className={classes.right}>
          &copy; 2020 Diversifying Talent in Quantum Computing, UBC, Geering Up
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
}
