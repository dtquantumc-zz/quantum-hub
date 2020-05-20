import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(75),
      height: theme.spacing(75)
    }
  }
}))

export default function GameContainer () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper variant='outlined' />
    </div>
  )
}
