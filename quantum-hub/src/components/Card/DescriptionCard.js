// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Card from './Card.js'
import CardHeader from './CardHeader'
import CardBody from './CardBody'

import GridContainer from '../Grid/GridContainer.js'
import GridItem from '../Grid/GridItem'

// import widgetList from '../Widget/Widget.json'
import Button from '../CustomButtons/Button'

import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Link from '@material-ui/core/Link'

import styles from '../../assets/jss/material-kit-react/components/descriptionCardStyle.js'
const useStyles = makeStyles(styles)

export default function DescriptionCard () {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [scroll, setScroll] = React.useState('paper')
  const descriptionElementRef = React.useRef(null)

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const handleClickOpen = (scrollType) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // let widgetInfo
  // if (widgetList[props.widget]) {
  //   widgetInfo = widgetList[props.widget]
  // } else {
  //   widgetInfo = {
  //     title: 'Title not found',
  //     subheader: 'Subheader not found',
  //     description: 'Description not found'
  //   }
  // }

  return (
    <GridContainer className={classes.container} justify='center'>
      <GridItem>
        <Card className={classes.descriptionCard}>
          <form className={classes.form}>
            <CardBody>
              <h4 className={classes.cardTitle}>The Sudoku Problem</h4>
              <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
                Sudoku is a logic-based, number-placement puzzle. To complete it, you must fill
                a 9x9 grid with single digits such that each column, row, and subgrid contain all
                of the digits from 1 to 9.
              </Typography>
              <Typography align='left' paragraph variant='body2' color='textSecondary' component='p'>
                While this puzzle can be solved on a <i>classical</i> computer, let's try solving
                it on a <i>quantum annealer</i>. In particular, we will be using D-Wave System's 2000Q
                Quantum Processing Unit. To use this web application, you require a unique API token from
                D-Wave Systems. You can obtain one by signing up for a <i>free</i> LEAP account on
                their <Link href='https://cloud.dwavesys.com/leap/'>website</Link>.
              </Typography>
              <Button color='geeringup' onClick={handleClickOpen('paper')}>Find Out More</Button>
            </CardBody>
          </form>
        </Card>
      </GridItem>

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
            <Typography align='left' paragraph>
              Select 'QPU' on the slider, input your API token, and click 'Submit'. You should see a
              confirmation message at the bottom of the page! You can navigate to other tabs, but if you
              refresh the page, you'll have to re-submit your API token.
            </Typography>
            <Typography align='left' paragraph>
              Select a cell on the Sudoku grid. Type in your desired digit. After entering the puzzle,
              press the 'Solve' button below.
            </Typography>
            <Typography align='left' paragraph>
              When you submit a problem to one of D-Wave's solvers, you are put in a queue. The time it
              takes to solve your Sudoku grid will depend on where you are in that queue.
            </Typography>
            <Typography align='left' paragraph>
              D-Wave's solvers are probabilistic, meaning that each run <i>might</i> result in a different
              solution. That is why problems are <i>sampled</i> many times, to make sure that the correct
              solution is identified. Well crafted Sudoku puzzles have <i>one</i> unique solution. In some
              cases, you can design a Sudoku puzzle such that there may be multiple possible solutions.
            </Typography>
            <Typography align='left' paragraph>
              For instance, what do you think will happen if you submit a blank grid to the solver? Try it
              out multiple times and see if you get the same answer each time!
            </Typography>
            <Typography align='left' paragraph>
              This application uses a script from D-Wave's gallery of examples
              linked <Link href='https://github.com/dwave-examples/sudoku'>here</Link>. The Sudoku puzzle is modeled as
              a <i>constraint satisfaction problem</i>, or CSP. These are problems in mathematics where the
              solution is the state of a set of objects such that they satisfy certain constraints or
              limitations. For instance, in Sudoku, there are a number of requirements or constraints for a
              solution to be correct.
            </Typography>
            <Typography align='left' paragraph>
              Each cell in the Sudoku puzzle must contain <i>one and only one</i> digit
              <ul>
                <li><b>No</b> row may have duplicate digits</li>
                <li><b>No</b> column may have duplicate digits</li>
                <li><b>No</b> subgrid may have duplicate digits</li>
              </ul>
            </Typography>
            <Typography align='left' paragraph>
              CSPs allow for finding useful general-purpose algorithms that help tackle many everyday problems.
              The applications of CSPs range from solving logic puzzles and scheduling nurses on shifts to
              applications in artifical intelligence and building neural networks.
            </Typography>
            <Typography align='left' paragraph>
              D-Wave's sudoku-solving script uses a hybrid
              solver, <Link href='https://docs.dwavesys.com/docs/latest/doc_leap_hybrid.html'>Kerberos</Link>. Kerberos breaks
              problems down into smaller pieces and solves each on a quantum computer, before combining them to
              provide one final solution.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='geeringup'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
  )
}
