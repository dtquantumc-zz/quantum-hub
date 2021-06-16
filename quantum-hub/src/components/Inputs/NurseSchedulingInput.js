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
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

// import GridContainer from '../Grid/GridContainer.js'
// import GridItem from '../Grid/GridItem'
import Button from '../CustomButtons/Button'
// import Card from '../Card/Card.js'
// import CardBody from '../Card/CardBody.js'
// import CardFooter from '../Card/CardFooter.js'
import CustomInput from '../CustomInput/CustomInput'
import NurseVars from '../Widget/Nurse/NurseVariables.js'

import styles from '../../assets/jss/material-kit-react/components/nurseSchedulingInputStyle.js'

const useStyles = makeStyles(styles)

export default function NurseSchedulingInput (props) {
  const classes = useStyles()

  const [numNursesError, setNumNursesError] = useState(false)
  const [numDaysError, setNumDaysError] = useState(false)
  const [numNursesPerDayError, setNumNursesPerDayError] = useState(false)

  const setters = {
    setNumNursesError: setNumNursesError,
    setNumDaysError: setNumDaysError,
    setNumNursesPerDayError: setNumNursesPerDayError
  }

  return (
    // <GridContainer justify='center'>
    //   <GridItem className={classes.gridItem}>
    // <Card className={classes.nurseSchedulingInput}>
    <form className={classes.form}>
      {/* <CardBody className={classes.cardBody}> */}
      <Grid className={classes.gridContainer} container spacing={2}>
        <Grid item xs={4}>
          <CustomInput
            labelText='Nurses'
            id='nurse'
            formControlProps={{
              fullWidth: true,
              error: numNursesError,
              disabled: props.disabled
            }}
            inputProps={{
              type: 'number',
              inputProps: {
                min: NurseVars.nursesLowerBound,
                max: NurseVars.nursesUpperBound
              },
              onChange: (e) => {
                props.setNumNurses(e.target.value, setters)
              }
            }}
            helperText={`Number of Nurses must be between ${NurseVars.nursesLowerBound} and ${NurseVars.nursesUpperBound}`}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomInput
            labelText='Days'
            id='days'
            formControlProps={{
              fullWidth: true,
              error: numDaysError,
              disabled: props.disabled
            }}
            inputProps={{
              type: 'number',
              inputProps: {
                min: NurseVars.daysLowerBound,
                max: NurseVars.daysUpperBound
              },
              onChange: (e) => {
                props.setNumDays(e.target.value, setters)
              }
            }}
            helperText={`Number of Days must be between ${NurseVars.daysLowerBound} and ${NurseVars.daysUpperBound}`}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomInput
            labelText='Nurses per Day'
            id='nursedays'
            formControlProps={{
              fullWidth: true,
              error: numNursesPerDayError,
              disabled: props.disabled
            }}
            inputProps={{
              type: 'number',
              inputProps: {
                min: NurseVars.nPDLowerBound,
                max: NurseVars.nPDUpperBound
              },
              onChange: (e) => {
                props.setNursesPerDay(e.target.value, setters)
              }
            }}
            helperText={`Nurses per Day must be between ${NurseVars.nPDLowerBound} and ${NurseVars.nPDUpperBound}`}
          />
        </Grid>
      </Grid>
      {/* </CardBody> */}
      <div className={classes.cardFooter}>
        <Button
          className={classes.detailButton}
          color='geeringupSecondary'
          size='md'
          round
          onClick={props.onSolve}
          disabled={numNursesError || numDaysError || props.disabled}
        >
          Solve
        </Button>
      </div>
    </form>
    // </Card>
    //   </GridItem>
    // </GridContainer>
  )
}
