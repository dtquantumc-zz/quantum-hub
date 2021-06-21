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

const buttonGroupStyle = theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(3)
    }
  },
  menuItem: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    color: '#43413E',
    fontWeight: '400',
    fontSize: '15px',
    padding: '0.5rem 1.3rem',
  },
});

export default buttonGroupStyle