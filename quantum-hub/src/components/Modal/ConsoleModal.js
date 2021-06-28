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

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '../../components/CustomButtons/Button.js'
import Console from '../../components/CustomOutput/console.js'
import widgetList from '../../components/Widget/widgetList'
import styles from '../../assets/jss/material-kit-react/components/consoleModalStyle.js'

const useStyles = makeStyles(styles)

function ConsoleModal (props) {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.modalContainer}>
      <Console
        textLines={props.textLines}
        title={widgetList[props.widget].name}
        key='terminalWindow'
        getIP={props.live}
      />
    </div>
  );

  return (
    <div className={classes.buttonContainer}>
      <Button 
        className={classes.detailButton}
        color='geeringupSecondaryModified'
        size='md'
        round
        onClick={() => handleOpen()}
      >
        View Console
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  )
}

export default ConsoleModal