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

// TODO: Copied from headerLinksStyle.js, should instead re-use
const footerLinksStyle = theme => ({
  list: {
    ...defaultFont,
    fontSize: '14px',
    margin: 0,
    paddingLeft: '0',
    listStyle: 'none',
    paddingTop: '0',
    paddingBottom: '0',
    color: 'inherit',
    display: 'inline-table'
  },
  listItem: {
    color: 'inherit',
    position: 'relative',
    display: 'contents',
    width: 'auto',
    margin: '0',
    padding: '0'
  },
  footerLink: {
    padding: '15px 30px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 15px',
    }
  },
  socialLink: {
    padding: '15px 10px',
    [theme.breakpoints.down('sm')]: {
      padding: '15px 4px',
    }
  },
  socialIcons: {
    color: '#87D3E4',
    fontSize: '20px !important'
  },
  ...tooltip
})

export default footerLinksStyle
