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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '70%'
  },
  buttonContainer: {
    display: 'flex'
  },
  detailButton: {
    marginLeft: '7.5%',
    marginRight: '7.5%',
    height: '45px',
    width: '85%'
  },
}));

function ConsoleModal (props) {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
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
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}

export default ConsoleModal