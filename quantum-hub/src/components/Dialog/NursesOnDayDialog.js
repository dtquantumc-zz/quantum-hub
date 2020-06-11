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

import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import PersonIcon from '@material-ui/icons/Person'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: 'rgba(80, 200, 235, 0.65)',
    color: '#50c8eb'
  }
})

export default function NursesOnDayDialog (props) {
  const classes = useStyles()
  const { onClose, selectedValue, open, nurseIndices } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
      <DialogTitle id='simple-dialog-title'>Nurses</DialogTitle>
      <List>
        {nurseIndices.map((nurseIndex) => (
          <ListItem button onClick={() => handleListItemClick(nurseIndex)} key={nurseIndex}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`Nurse ${nurseIndex + 1}`} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

NursesOnDayDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  nurseIndices: PropTypes.arrayOf(PropTypes.number)
}
