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

const nurseSchedulingInputStyle = theme => ({
  gridContainer: {
    paddingTop: '0'
  },
  gridItem: {
    width: '100%'
  },
  container: {
    ...container,
    zIndex: '2',
    position: 'relative',
    paddingTop: '20vh',
    color: '#FFFFFF',
    paddingBottom: '200px',
    margin: '8px'
  },
  nurseSchedulingInput: {
    marginTop: '0',
    boxShadow: 'none'
  },
  pageHeader: {
    minHeight: '100vh',
    height: 'auto',
    display: 'inherit',
    position: 'relative',
    margin: '0',
    padding: '0',
    border: '0',
    alignItems: 'center',
    '&:before': {
      background: 'rgba(0, 0, 0, 0.5)'
    },
    '&:before,&:after': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: '""'
    },
    '& footer li a,& footer li a:hover,& footer li a:active': {
      color: '#FFFFFF'
    },
    '& footer': {
      position: 'absolute',
      bottom: '0',
      width: '100%'
    }
  },
  form: {
    width: 'auto',
    margin: 'auto'
  },
  cardHeader: {
    width: 'auto',
    textAlign: 'center',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '-40px',
    padding: '15px 0',
    marginBottom: '0px',
    '& > *': {
      margin: '0'
    }
  },
  socialIcons: {
    maxWidth: '24px',
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px'
  },
  divider: {
    marginTop: '30px',
    marginBottom: '0px',
    textAlign: 'center'
  },
  cardFooter: {
    display: 'flex',
    paddingTop: '0',
    border: '0',
    borderRadius: '6px',
    justifyContent: 'center !important'
  },
  detailButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '200px',
    height: '45px',
    [theme.breakpoints.down('md')]: {
      height: '35px'
    }
  },
  socialLine: {
    marginTop: '1rem',
    textAlign: 'center',
    padding: '0'
  },
  inputIconsColor: {
    color: '#495057'
  }
})

export default nurseSchedulingInputStyle
