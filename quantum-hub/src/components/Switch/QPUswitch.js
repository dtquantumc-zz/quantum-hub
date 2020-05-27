import React from 'react'
import XMLHttpRequest from 'xhr2'

// nodejs library to set properties for components
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Fade from '@material-ui/core/Fade'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import CustomInput from '../CustomInput/CustomInput.js'
import GridItem from '../Grid/GridItem.js'
import Button from '../CustomButtons/Button.js'

import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  },
  container: {
    display: 'flex'
  },
  formControlLabel: {
    '& .MuiTypography-body1': {
      color: 'rgba(0, 0, 0, 0.87)'
    }
  },
  switch: {
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      color: '#D96262'
    },
    '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#D96262'
    }
  }
}))

export default function QPUswitch (props) {
  const classes = useStyles()
  const [checked, setChecked] = React.useState(false)
  const [token, setToken] = React.useState('')
  const [typeOfProblem, setTypeOfProblem] = React.useState(props.typeOfProblem)

  const handleChange = () => {
    setChecked((prev) => !prev)
    if (checked) props.setAPIKey('')
  }

  // let currentXhr = null
  const handleClick = () => {
    props.setAPIKey(token)

    // if (currentXhr) {
    //   currentXhr.abort()
    // }

    // currentXhr = new XMLHttpRequest()
    // const url = '/api_token'
    // const params = {
    //   token: token,
    //   typeOfProblem: typeOfProblem
    // }
    // const async = true

    // currentXhr.open('POST', url, async)

    // currentXhr.onload = () => {
    //   console.log(currentXhr.responseText)
    //   currentXhr = null
    // }

    // currentXhr.setRequestHeader('Content-type', 'application/json')
    // currentXhr.send(JSON.stringify(params))
  }

  return (
    <GridItem
      className={classes.root}
      children={[
        <FormControlLabel
          className={classes.formControlLabel}
          control={<Switch className={classes.switch} checked={checked} onChange={handleChange} />}
          label='QPU'
          key='qpuSwitchControlLabel'
        />,

        <div className={classes.container} key='qpuSwitchActualSwitch'>
          <Fade in={checked}>
            <GridItem
              children={[
                <CustomInput
                  labelText='API Token'
                  id='pass'
                  key='qpuSwitchInputForm'
                  formControlProps={{
                    fullWidth: false
                  }}
                  inputProps={{
                    type: 'password',
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Icon>
                        lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    autoComplete: 'off',
                    onChange: e => setToken(e.target.value)
                  }}
                />,
                <Button
                  color='geeringup'
                  size='sm'
                  style={{ margin: '28.5px 0 17px 9px', position: 'relative' }}
                  onClick={handleClick.bind(this)}
                  key=''
                >
                  Submit
                </Button>
              ]}
            />
          </Fade>
        </div>
      ]}
    />
  )
}

QPUswitch.propTypes = {
  typeOfProblem: PropTypes.string
}
