import React from 'react'

import Dialog from '@material-ui/core/Dialog'
export default function ReadMoreDialog (props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogTitle id='scroll-dialog-title'>Instructions</DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText
          id='scroll-dialog-description'
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          {props.dialogContentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='geeringupSecondary'>
            Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
