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

import { container, title } from '../../material-kit-react.js'

const appStyle = {
  container: {
    zIndex: '12',
    color: '#FFFFFF',
    marginTop: '74px',
    ...container
  },
  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    color: '#FFFFFF',
    textDecoration: 'none'
  },
  subtitle: {
    fontSize: '1.313rem',
    maxWidth: '500px',
    margin: '10px auto 0'
  },
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3'
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
  },
  gridContainer: {
    justifyContent: 'center',
    '& > :not(.game)': {
      marginTop: '8px'
    }
  },
  nurseSchedulingInput: {
    justifyContent: 'center'
  },
  nurseSwitchButton: {
    margin: '8px 8px 8px calc(22px - ((292.906px - 286.969px) / 2))',
    backgroundColor: '#D96262',
    '&:hover,&:focus': {
      backgroundColor: '#D96262'
    }
  },
  sudokuSwitchButton: {
    margin: '8px',
    backgroundColor: '#D96262',
    '&:hover,&:focus': {
      backgroundColor: '#D96262'
    }
  }
}

export default appStyle
