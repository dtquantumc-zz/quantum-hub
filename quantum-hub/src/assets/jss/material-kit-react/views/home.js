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
import backgroundImage from '../../../../images/bg.jpg'

const homeStyle = theme => ({
  root: {
    background: '#fff'
  },
  heroContainer: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    padding: '350px 0 190px',
    [theme.breakpoints.down('md')]: {
      padding: '165px 0 135px'
    }
  },
  hero: {
    display: 'flex',
    marginLeft: '7%',
    maxWidth: '70%',
    [theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '75%'
    }
  },
  heroHeading: {
    color: '#fff',
    fontSize: '4rem',
    fontFamily: 'Roboto',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6rem'
    }
  },
  heroSubheading: {
    color: '#fff',
    textAlign: 'left',
    fontSize: '1.5rem',
    fontFamily: 'Roboto Slab',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem'
    }
  },
  buttonContainer: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    }
  },
  detailButton: {
    marginTop: theme.spacing(3),
    fontSize: '18px',
    padding: '15px 50px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
      padding: '12px 40px'
    }
  },
  descriptionContainer: {
    padding: '150px 100px',
    background: '#F4F4F4',
    [theme.breakpoints.down('sm')]: {
      padding: '60px 40px'
    }
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
      order: 1,
      paddingBottom: theme.spacing(5)
    }
  },
  subheadingBlue: {
    fontFamily: 'Roboto',
    color: '#1D5561',
    fontSize: '36px',
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginTop: '0',
    lineHeight: '130%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    }
  },
  subheadingYellow: {
    fontFamily: 'Roboto',
    color: '#C3872B',
    fontSize: '36px',
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginTop: '0',
    lineHeight: '130%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    }
  },
  descriptionText: {
    fontFamily: 'Roboto Slab',
    fontSize: '18px',
    textAlign: 'left',
    color: '#63696D',
    lineHeight: '160%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px',
    }
  },
  image: {
    width: '75%', 
    borderRadius: '50px'
  },
  caption: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    color: '#63696D',
    lineHeight: '160%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    }
  },
  sliderContainer: {
    padding: '150px 100px',
    [theme.breakpoints.down('sm')]: {
      padding: '40px'
    }
  },
  gameCard: {
    width: '300px',
    height: '300px',
    background: '#FBFBFB',
    borderRadius: '15px',
    border: '0.5px solid #C7C7C7',
    marginTop: '10px',
    '&:hover': {
      transform: 'translateY(-1%)',
      boxShadow: '0 5px 15px 0 rgba(64,62,61,0.05)',
      transition: '.45s cubic-bezier(.19,1,.4,1)'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      width: '200px',
      height: '200px'
    }
  },
  gameLink: {
    textDecoration: 'none'
  },
  slider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginTop: '0'
    }
  },
  arrowIcons: {
    color: '#C3872B',
    fontSize: '2.5rem',
    '&:hover,&:focus': {
      cursor: 'pointer'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    }
  },
  gameCardText: {
    textTransform: 'uppercase',
    color: '#63696D',
    fontWeight: 'bold',
    fontSize: '18px',
    letterSpacing: '0.025em',
    margin: '10px 25px 5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    }
  },
  gameCardImage: {
    height: '160px', 
    margin: 'auto', 
    padding: '25px 25px 15px',
    [theme.breakpoints.down('sm')]: {
      height: '100px',
      padding: '15px 15px 5px'
    }
  },
  featureContainer: {
    background: '#E7F3F6',
    padding: theme.spacing(5),
    paddingLeft: '100px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: '40px'
    }
  },
  featureImage: {
    width: '125%',
    maxWidth: '800px',
    [theme.breakpoints.down('sm')]: {
      width: '150%',
      marginLeft: '45px',
      zIndex: '-1'
    }
  },
  featureDescription: {
    marginTop: theme.spacing(12),
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(6)
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3)
    }
  },
  linkText: {
    color: '#C3872B',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '17px',
    textAlign: 'left',
    letterSpacing: '0.1em',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px'
    }
  },
  links: {
    color: '#C3872B'
  }
})

export default homeStyle
