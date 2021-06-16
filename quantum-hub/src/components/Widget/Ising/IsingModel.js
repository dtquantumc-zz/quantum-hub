// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'
// import PropTypes from 'prop-types'

// import latticeSolveRequest from './latticeSolveRequest'
// import HexGrid from './HexGrid'

import Button from '../../CustomButtons/Button.js'
import Slider from '@material-ui/core/Slider'
// import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
// import Input from '@material-ui/core/Input'
import CustomInput from '../../CustomInput/CustomInput'

import { makeStyles } from '@material-ui/core/styles'
import styles from '../../../assets/jss/material-kit-react/components/isingStyle.js'
import './IsingModel.css'
// import IsingVars from './IsingVars'

/**
 * Ising Model is a React component containing a graph
 * model of the energy landscape of a single qubit in
 * the Dwave quantum annealer
 *
 * Example Use::
 *
 *  const [APIKey, setAPIKey] = useState('')
 *  const [textLines, setTextLines] = useState([])
 *  return (
 *    <IsingModel
 *      id='myModel'
 *      getAPIKey={() => APIKey}
 *      outputToConsole={(line) => {
 *        setTextLines(textLines.concat(line))
 *      }}
 *      appendToConsole={}
 *    />
 *  )
 *
 * Properties:
 * @prop {string} id - (Required) This will get extended to
 * serve as the id base string for all underlying components.
 * @prop {func()} getAPIKey - (Required) This needs
 * to be a function that can be called to return the current API
 * key.
 * NOTE: If it returns '', this is equivalent to choosing the
 * simulator.
 * @prop {func(string)} outputToConsole - (Required) This function
 * should take a single string (a line of text), and concatenate
 * it to the current console output string array. If the Console
 * is not being used, this can do anything you want with that
 * string, but you should probably output it in some way.
 * @prop {func(string)} appendToConsole - (Required) Same as output,
 * but just appends
 * the given string to the last line of the Console.
 */
function IsingModel (props) {
  const [sliderVal, setSliderVal] = React.useState(0)

  const [stateWeight, setStateWeight] = React.useState(Math.random() - 0.5)

  const [HVal, setHVal] = React.useState(Math.round((stateWeight < 0 ? 1 : -1) * (Math.pow(10, Math.abs(stateWeight) * 7) - 1)))

  const [annealTime, setAnnealTime] = React.useState(200)

  const [result, setResult] = React.useState(-1)

  const [simulating, setSimulating] = React.useState(false)

  if (typeof IsingModel.interVal === 'undefined') {
    IsingModel.interVal = null
  }

  const useStyles = makeStyles(styles)

  const classes = useStyles()

  const timeSliderVal = sliderVal / 100

  // const upH = Math.log10(Math.abs(HVal) + 1) / 7

  const leftH = (stateWeight > 0 ? stateWeight : 0)
  const rightH = (stateWeight < 0 ? -stateWeight : 0)

  const runSim = () => {
    console.log('running')
    if (IsingModel.timeStep === 100) {
      clearInterval(IsingModel.interVal)
      setSimulating(false)
      doSim(stateWeight, annealTime, setResult)
      return
    }
    IsingModel.timeStep++
    setSliderVal(IsingModel.timeStep)
  }

  const startSim = () => {
    if (!simulating) {
      setSimulating(true)
      IsingModel.interVal = setInterval(runSim, 25)
      IsingModel.timeStep = 0
      setResult(-1)
    }
  }

  return (
    <div className={classes.isingRoot}>
      <svg height='315' width='476'>
        <g // Curve
          fill='none'
          strokeLinecap='round'
          strokeWidth={4}
          stroke='black'
        >
          <IsingModelCurve
            x={50}
            y={25}
            width={376}
            height={250}
            leftHeight={leftH}
            rightHeight={rightH}
            time={timeSliderVal}
          />
        </g>
        <g // Graph line Group
          stroke='gray'
          strokeWidth={4}
        >
          <path
            strokeLinecap='round'
            d='M25,25 25,275'
          />
          <polygon
            points='20,273 30,273 25,280'
            fill='gray'
          />
        </g>
        <g // Text Group
          fill='gray'
          strokeWidth={1}
          fontFamily='sans-serif'
          fontSize='16'
        >
          <text x='0' y='12'>
            High Energy
          </text>
          <text x='0' y='300'>
            Low Energy
          </text>
          <text x='400' y='250'>
            {Math.floor(timeSliderVal * annealTime) + ' μs'}
          </text>
        </g>
        <g // Ket Group
          opacity={timeSliderVal}
        >
          <Ket
            x={238 - 14 - 32 - timeSliderVal * 62}
            y={125}
            size={32}
            content='0'
            isSelected={result === 0}
          />

          <Ket
            x={238 - 14 + 32 + timeSliderVal * 62}
            y={125}
            size={32}
            content='1'
            isSelected={result === 1}
          />
        </g>
      </svg>
      <div>
        <Grid className={classes.gridContainer} container spacing={2}>
          <Grid item xs={9}>
            <div className='newcontain'>
              <Button
                disabled={simulating}
                className={classes.detailButton}
                color='geeringupSecondary'
                size='md'
                round
                onClick={() => {
                  startSim()
                }}
              >
                Simulate
              </Button>
              <div
                className='resultText'
              >
                Latest result: {result === -1 ? '|?\u232a' : (result ? '|1\u232a' : '|0\u232a')}
              </div>
            </div>
            <div className='contain'>
              <div className='timeText'>
                Time:
              </div>
              <div className='sliderContainer'>
                <Slider
                  disabled={simulating}
                  defaultValue={0}
                  value={sliderVal}
                  onChange={(e, val) => {
                    setSliderVal(val)
                  }}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <CustomInput
              labelText='Anneal Time (μs)'
              id='t_input'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: simulating,
                defaultValue: 200,
                type: 'number',
                inputProps: {
                  min: 20,
                  max: 200000
                },
                onChange: (e) => {
                  if (e.target.value < 0) e.target.value *= -1
                  if (e.target.value > 200000) e.target.value = 200000
                  if (e.target.value !== '' && e.target.value >= 20 && e.target.value <= 200000) {
                    setAnnealTime(e.target.value)
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={3}> {/* H-value input */}
            <div className='moveUp'>
              <CustomInput
                labelText='H-value'
                id='h_input'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: HVal,
                  disabled: simulating,
                  type: 'number',
                  inputProps: {
                    min: -1e7 + 1,
                    max: 1e7 - 1
                  },
                  onChange: (e) => {
                    if (e.target.value.trim !== '') {
                      e.target.value = Math.max(-1e7 + 1, Math.min(1e7 - 1, e.target.value))
                      var upH = Math.log10(Math.abs(e.target.value) + 1) / 7
                      upH *= (e.target.value < 0 ? 1 : -1)
                      setStateWeight(upH)
                    } else {
                      setStateWeight(0)
                    }
                    if (e.target.value === 0) {
                      e.target.value = null
                    }
                    setHVal(e.target.value)
                  }
                }}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='contain'>
              <div className='inside'>
                |0&#9002;
              </div>
              <div className='inside'>
                Weight
              </div>
              <div className='inside'>
                |1&#9002;
              </div>
            </div>
            <Slider
              max={1}
              min={-1}
              step={0.02}
              disabled={simulating}
              defaultValue={0}
              value={stateWeight}
              onChange={(e, val) => {
                setStateWeight(val)
                var newHVal = Math.pow(10, Math.abs(val) * 7) - 1
                newHVal *= (val < 0 ? 1 : -1)
                setHVal(Math.round(newHVal))
              }}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

function doSim (weight, time, setAns) {
  var r = Math.random() // between 0 and 1
  console.log('before: ' + r)
  r += (weight) * (Math.log2(time) / Math.log2(200000))
  console.log('after: ' + r)
  if (r < 0.5) {
    setAns(0)
  } else {
    setAns(1)
  }
}

function IsingModelCurve (props) {
  const { x, y, height, width, leftHeight, rightHeight, time } = props

  const ly = y + height / 2 + (1 - leftHeight) * height / 2
  const ry = y + height / 2 + (1 - rightHeight) * height / 2

  var b = time

  var a = 1 - time

  const w2 = width / 2
  const w4 = width / 4
  const w7 = width / 7
  const w8 = width / 8
  const w24 = width / 24

  const h2 = height / 2
  const h4 = height / 4
  const h34 = 3 * h4

  const bly = b * ly
  const bry = b * ry

  const midH = y + h2 + a * h2

  var d = `M${x},${y}`

  d += ` S${x + w7},${bly + a * (y + h34 - w8)} ${x + w4},${bly + a * (y + h34)}`

  d += ` S${x + 3 * w8 + a * w24},${midH} ${x + w2},${midH}`

  d += ` S${x + w2 + w7},${bry + a * (y + h34 + w8)} ${x + 3 * w4},${bry + a * (y + h34)}`

  d += ` S${x + width},${y} ${x + width},${y}`

  return (
    <>
      <path
        d={d}
      />
    </>
  )
}

function Ket (props) {
  const { x, y, size, content, isSelected } = props
  const s = size
  const s2 = size / 2
  const s3 = size / 3
  const s4 = size / 4
  const s8 = size / 8
  const s16 = size / 16
  const p1 = `M ${x},${y} l 0,${-s}`
  const p2 = `M ${x + s - s8},${y} l ${s3},${-s2} l ${-s3},${-s2}`
  const p3 = `M ${x + s2},${y - s16} l 0,${-s2 - s4} l ${-s8},${s8}`
  return (
    <>
      {/* {isSelected ? (
        <g
          strokeWidth={s8 + s16}
          fill='none'
          stroke='black'
          strokeLinecap='square'
        >
          <path d={p1} />
          <path d={p2} />
          {content === '0' ? <ellipse cx={x + s2} cy={y - s2} rx={s4} ry={s2 - s16} /> : null}
          {content === '1' ? <path d={p3} /> : null}
        </g>)
        : null} */}
      <g
        strokeWidth={s8}
        fill='none'
        stroke={isSelected ? 'black' : 'lightgray'}
        strokeLinecap='square'
      >
        <path d={p1} />
        <path d={p2} />
        {content === '0' ? <ellipse cx={x + s2} cy={y - s2} rx={s4} ry={s2 - s16} /> : null}
        {content === '1' ? <path d={p3} /> : null}
      </g>
    </>
  )
}

export default IsingModel
