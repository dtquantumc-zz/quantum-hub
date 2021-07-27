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
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: '5.5rem 1.5rem 3.5rem'
    }
  },
  hero: {
    display: 'flex',
    maxWidth: '1272px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
    paddingRight: '32px',
    paddingLeft: '32px',
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
    padding: '15px 20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '15px',
      width: '100%',
      marginTop: '1rem'
    }
  },
  heroImage: {
    width: '95%',
    [theme.breakpoints.down('xs')]: {
      width: '130%'
    }
  },
  section: {
    paddingTop: '9.5rem',
    paddingBottom: '9.5rem',
    margin: '0px auto',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1288px'
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '3.5rem',
      paddingBottom: '3.5rem'
    }
  },
  sectionGrey: {
    background: '#F4F4F4',
    paddingTop: '6.5rem',
    paddingBottom: '6.5rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '3.5rem',
      paddingBottom: '3.5rem'
    }
  },
  gridContainer: {
    paddingRight: '32px',
    paddingLeft: '32px',
  },
  gridItemLeft: {
    order: 1,
    [theme.breakpoints.down('xs')]: {
      order: 2
    }
  },
  gridItemRight: {
    order: 2,
    [theme.breakpoints.down('xs')]: {
      order: 1
    }
  },
  puzzlesGridContainer: {
    paddingRight: '32px',
    paddingLeft: '32px',
    margin: '0px auto',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1288px'
    }
  },
  headingText: {
    color: '#3B3376',
    fontSize: '2.5rem',
    letterSpacing: '0.1em',
    fontFamily: 'Roboto',
    textAlign: 'left',
    marginBottom: '20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem'
    }
  },
  bodyText: {
    color: '#3D3D46',
    fontSize: '1.2rem',
    lineHeight: '150%',
    letterSpacing: '0.045em',
    fontFamily: 'Roboto',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    }
  },
  imageBlock: {
    maxWidth: '75%',
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3)
    }
  },
  largeImageBlock: {
    maxWidth: '120%',
    [theme.breakpoints.down('md')]: {
      maxWidth: '90%'
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3)
    }
  },
  textBlock: {
    maxWidth: '445px'
  },
  sectionDownload: {
    padding: '4.5rem 1.5rem',
    textAlign: 'center',
    paddingBottom: '2.5rem',
  },
  downloadContainer: {
      backgroundColor: '#E7F3F6'
  },
  appIcon: {
    top: '-60px',
    position: 'relative'
  },
  downloadText: {
    top: '-60px',
    position: 'relative',
    width: '35%',
    maxWidth: '450px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    }
  },
  downloadHeadingText: {
    color: '#3B3376',
    fontSize: '2.5rem',
    letterSpacing: '0.1em',
    fontFamily: 'Roboto',
    marginTop: '20px',
    marginBottom: '20px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem'
    }
  },
  downloadBodyText: {
    color: '#3D3D46',
    fontSize: '1.2rem',
    lineHeight: '150%',
    letterSpacing: '0.045em',
    fontFamily: 'Roboto',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    }
  }
})

export default homeStyle
