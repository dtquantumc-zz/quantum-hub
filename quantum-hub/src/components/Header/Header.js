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
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
// @material-ui/icons
import MenuIcon from '@material-ui/icons/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
// core components
import widgetList from '../Widget/widgetList'
import styles from '../../assets/jss/material-kit-react/components/headerStyle.js'

const useStyles = makeStyles(styles)

export default function Header (props) {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [appMenuAnchor, setAppMenuAnchor] = React.useState(null)

  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener('scroll', headerColorChange)
    }
    return function cleanup () {
      if (props.changeColorOnScroll) {
        window.removeEventListener('scroll', headerColorChange)
      }
    }
  })

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const handleAppMenuClick = (event) => {
    setAppMenuAnchor(event.currentTarget)
  }
  const handleAppMenuClose = () => {
    setAppMenuAnchor(null)
  }

  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props
    const windowsScrollTop = window.pageYOffset
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName('header')[0]
        .classList.remove(classes[color])
      document.body
        .getElementsByTagName('header')[0]
        .classList.add(classes[changeColorOnScroll.color])
    } else {
      document.body
        .getElementsByTagName('header')[0]
        .classList.add(classes[color])
      document.body
        .getElementsByTagName('header')[0]
        .classList.remove(classes[changeColorOnScroll.color])
    }
  }
  const { color, rightLinks, leftLinks, brand, fixed, absolute, setWidget, loading } = props
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed
  })
  const brandComponent =
    <>
      <Button
        className={classes.title}
        onClick={handleAppMenuClick}

      >
        {loading ? '' : (
          <>
            <MoreVertIcon />
            <div className={classes.lPad} />
          </>
        )}
        {brand}
      </Button>
      <Menu
        disabled={loading}
        id='AppMenu'
        variant='temporary'
        anchorEl={appMenuAnchor}
        open={Boolean(appMenuAnchor)}
        onClose={handleAppMenuClose}
        className={classes.menu}
        keepMounted
      >
        {Object.keys(widgetList).map((widget) => {
          if (widget === 'default') return ''
          return (
            <MenuItem
              key={widget}
              onClick={() => {
                setWidget(widget)
                handleAppMenuClose()
              }}
            >
              {widgetList[widget].brand}
            </MenuItem>
          )
        })}
      </Menu>
    </>

  const leftLinksComponent = <Hidden smDown implementation='css'>{leftLinks}</Hidden>
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.leftLinks}>
          {leftLinks !== undefined ? leftLinksComponent : null}
        </div>
        <div className={classes.flex}>
          {brandComponent}
        </div>
        <div className={classes.rightLinks}>
          <Hidden smDown implementation='css'>
            {rightLinks}
          </Hidden>
        </div>
        <Hidden mdUp>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation='js'>
        <Drawer
          variant='temporary'
          anchor='right'
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  )
}

Header.defaultProp = {
  color: 'white'
}

Header.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'transparent',
    'white',
    'rose',
    'dark',
    'geeringupPrimary'
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      'primary',
      'info',
      'success',
      'warning',
      'danger',
      'transparent',
      'white',
      'rose',
      'dark'
    ]).isRequired
  })
}
