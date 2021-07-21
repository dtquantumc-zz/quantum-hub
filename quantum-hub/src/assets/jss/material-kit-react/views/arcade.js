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

const homeStyle = theme => ({
  root: {
    background: '#fff'
  },
  heroContainer: {
    background: '#E7F3F6',
    padding: '8.5rem 0 4.5rem',
    [theme.breakpoints.down('sm')]: {
      padding: '5.5rem 1.5rem 3.5rem'
    }
  },
  hero: {
    display: 'flex',
    paddingTop: '1rem',
    maxWidth: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
    [theme.breakpoints.up('xl')]: {
      maxWidth: '1288px'
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },
  heroSubheading: {
    color: '#3D3D46',
    fontSize: '1.5rem',
    lineHeight: '150%',
    letterSpacing: '0.045em',
    fontFamily: 'Roboto',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.25rem'
    }
  },
  detailButton: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
    fontSize: '16px',
    width: '160px',
    height: '50px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px'
    }
  },
  heroImage: {
    width: '95%'
  }
})

export default homeStyle
