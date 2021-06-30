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
import backgroundImage from '../../../../images/bg.jpg';
import { container } from '../../material-kit-react.js'

const homeStyle = theme => ({
  root: {
      background: '#fff'
  },
  heroContainer: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    padding: '390px 0 150px',
    [theme.breakpoints.down('sm')]: {
      padding: '165px 0 135px'
    }
  },
  hero: {
    display: 'flex',
    marginLeft: '5%',
    maxWidth: '85%',
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
  }
})

export default homeStyle
