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

import { defaultFont } from '../../material-kit-react.js'

import tooltip from '../tooltipsStyle.js'

const headerLinksStyle = theme => ({
  list: {
    ...defaultFont,
    fontSize: '14px',
    margin: 0,
    paddingLeft: '0',
    listStyle: 'none',
    paddingTop: '0',
    paddingBottom: '0',
    color: 'inherit'
  },
  listItem: {
    float: 'left',
    color: 'inherit',
    position: 'relative',
    display: 'block',
    width: 'auto',
    margin: '0',
    padding: '0',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  navLink: {
    color: 'inherit',
    position: 'relative',
    padding: '0.9375rem',
    fontWeight: '400',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-flex',
    '&:hover,&:focus': {
      color: 'inherit',
      background: 'rgba(200, 200, 200, 0.2)'
    },
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 30px)',
      marginLeft: '15px',
      marginBottom: '8px',
      marginTop: '8px',
      textAlign: 'left',
      '& > span:first-child': {
        justifyContent: 'flex-start'
      }
    }
  },
  leftNavLink: {
    color: 'inherit',
    position: 'relative',
    padding: '0 10px',
    fontWeight: '400',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-flex',
    '&:focus': {
      color: 'inherit',
      background: 'rgba(200, 200, 200, 0.2)'
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '5px',
      marginTop: '5px',
      paddingLeft: '12px',
      textAlign: 'left',
      '& > span:first-child': {
        justifyContent: 'flex-start'
      }
    }
  },
  rightNavLink: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '18px',
    letterSpacing: '0.115em',
    borderRadius: '3px',
    textTransform: 'uppercase',
    color: 'white',
    padding: '8px 16px',
    '&:hover,&:focus': {
      color: '#1D5561',
      background: 'transparent'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '8px 0px',
      '&:hover,&:focus': {
        color: '#fff'
    },
    }
  },
  menu: {
    '& .MuiPaper-root': {
      backgroundColor: 'rgba(135, 211, 228, 0.9)',
      boxShadow: 'none',
      paddingTop: '14px',
      borderRadius: '0'
    }
  },
  menuItem: {
    '&:hover,&:focus': {
      background: 'transparent'
    }
  },
  dropdownLink: {
    fontFamily: 'Roboto',
    lineHeight: '30px',
    fontWeight: 'bold',
    fontSize: '18px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'white',
    '&:hover,&:focus': {
      color: '#1D5561'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      textTransform: 'capitalize'
    }
  },
  accordion: {
    background: 'transparent',
    border: 'none'
  },
  accordionSummary: {
    borderTop: '.5px solid #e5e5e5',
    borderBottom: '.5px solid #e5e5e5',
    paddingLeft: '20px'
  },
  accordionDetails: {
    borderBottom: '.5px solid #e5e5e5',
    padding: '16px 18px'
  },
  icons: {
    color: '#fff',
    width: '25px',
    height: '25px'
  },
  socialIcons: {
    position: 'relative',
    fontSize: '20px !important',
    marginRight: '4px'
  },
  ...tooltip,
  marginRight5: {
    marginRight: '5px'
  }
})

export default headerLinksStyle
