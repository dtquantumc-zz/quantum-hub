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

import GridContainer from '../Grid/GridContainer.js'
import GridItem from '../Grid/GridItem'
import Button from '../CustomButtons/Button'
import Card from '../Card/Card.js'
import CardBody from '../Card/CardBody.js'
import CardHeader from '../Card/CardHeader.js'
import CardFooter from '../Card/CardFooter.js'
import CustomInput from '../CustomInput/CustomInput'

import styles from '../../assets/jss/material-kit-react/components/nurseSchedulingInputStyle.js'

const useStyles = makeStyles(styles)

export default function NurseSchedulingInput (props) {
  const classes = useStyles()
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden')
  setTimeout(function () {
    setCardAnimation('')
  }, 700)

  return (
    <GridContainer justify='center'>
      <GridItem xs={12} sm={12} md={4}>
        <Card className={classes[cardAnimaton]}>
          <form className={classes.form}>
            <CardHeader color='geeringup' className={classes.cardHeader}>
              <h4>Input Fields</h4>
            </CardHeader>
            <CardBody>
              <CustomInput
                labelText='Nurses (Max 50)'
                id='nurse'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'number',
                  max: 30,
                  min: 0,
                  onChange: (e) => {
                    props.setNumNurses(e.target.value)
                  }
                }}
              />
              <CustomInput
                labelText='Days (Max 30)'
                id='days'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'number',
                  max: 30,
                  min: 0,
                  onChange: (e) => {
                    props.setNumDays(e.target.value)
                  }
                }}
              />
            </CardBody>
            <CardFooter className={classes.cardFooter}>
              <Button color='geeringup' onClick={props.onSolve}>
                    Solve
              </Button>
            </CardFooter>
          </form>
        </Card>
      </GridItem>
    </GridContainer>
  )
}
