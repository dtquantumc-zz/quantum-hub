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

import { container } from '../../material-kit-react.js'

const footerStyle = theme => ({
  block: {
    color: 'inherit',
    padding: '0.9375rem',
    fontWeight: '500',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    textDecoration: 'none',
    position: 'relative',
    display: 'block'
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 8px',
    color: '#43413E',
    letterSpacing: '0.045em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      paddingLeft: '0px'
    }
  },
  right: {
    float: 'right!important',
    display: 'block'
  },
  footer: {
    padding: '100px 48px 0px',
    textAlign: 'center',
    maxWidth: '1450px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: '56px 32px 0px',
    }
  },
  subheadingBlue: {
    color: '#1D5561',
    fontSize: '24px',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginTop: '0',
    lineHeight: '130%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px'
    }
  },
  partnerLinks: {
    paddingBottom: '48px',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '32px'
    }
  },
  a: {
    color: '#D96262',
    textDecoration: 'none',
    backgroundColor: 'transparent'
  },
  footerWhiteFont: {
    '&,&:hover,&:focus': {
      color: '#FFFFFF'
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    ...container
  },
  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0'
  },
  inlineBlock: {
    display: 'inline-block',
    padding: '0px',
    width: 'auto'
  },
  icon: {
    width: '18px',
    height: '18px',
    position: 'relative',
    top: '3px'
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})
export default footerStyle
