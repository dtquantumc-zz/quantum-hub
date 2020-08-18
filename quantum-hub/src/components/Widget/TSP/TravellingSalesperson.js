// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useState, useRef, useEffect } from 'react'

import Button from '../../CustomButtons/Button.js'
import ButtonGroup from '@material-ui/core/ButtonGroup'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import TSPstate from './TSPstate.js'
import TSPutils from './TSPutils.js'

import Graph from './Graph.js'
import Keys from './Keys.js'

import Map from './Map.js'

import CircularProgress from '@material-ui/core/CircularProgress'

import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../../assets/jss/material-kit-react/components/travellingSalespersonStyle.js'

function TravellingSalesperson (props) {
  const tspState = TSPstate.getInstance()

  // NOTE: The Cities Graph is used as the Default

  const [open, setOpen] = useState(false)
  const [currentGraph, setCurrentGraph] = useState(Graph[Keys.CITIES])
  const [position, setPosition] = useState([tspState.getCitiesState().lat, tspState.getCitiesState().lng])
  const [scroll, setScroll] = useState('paper')
  const [key, setKey] = useState(Keys.CITIES)
  const [waypoints, setWaypoints] = useState(TSPutils.getCitiesWaypoints())
  const [isPathSolved, setIsPathSolved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [numSelectedNodes, setNumSelectedNodes] = useState(false)

  const descriptionElementRef = useRef(null)

  const useStyles = makeStyles(styles)
  const classes = useStyles()

  const loadingContainerClasses = classNames({
    [classes.loadingContainer]: loading
  })

  useEffect(() => {
    if (open) {
      openDescriptionElement()
    }
  }, [open])

  const openDescriptionElement = () => {
    const { current: descriptionElement } = descriptionElementRef
    if (descriptionElement !== null) {
      descriptionElement.focus()
    }
  }

  return (
    <div className={classes.root}>
      <div className={loadingContainerClasses}>
        {loading && <CircularProgress size={68} className={classes.mapProgress} />}
        <div className={TSPutils.isCitiesGraph(key) ? classes.mapContainer : classes.hidingContainer}>
          <Map
            position={position}
            isPathSolved={isPathSolved}
            waypoints={waypoints}
            currentGraph={currentGraph}
            Key={Keys.CITIES}
            loading={loading}
            setLoading={setLoading}
            setNumSelectedNodes={setNumSelectedNodes}
          />
        </div>
        <div className={key === Keys.VANCOUVER ? classes.mapContainer : classes.hidingContainer}>
          <Map
            position={position}
            isPathSolved={isPathSolved}
            waypoints={waypoints}
            currentGraph={currentGraph}
            Key={Keys.VANCOUVER}
            loading={loading}
            setLoading={setLoading}
            setNumSelectedNodes={setNumSelectedNodes}
          />
        </div>
      </div>
      <div className={classes.buttonGroup}>
        <ButtonGroup variant='contained' color='geeringupSecondary' aria-label='contained primary button group'>
          <Button
            size='sm'
            disabled={loading || TSPutils.isCitiesGraph(key)}
            onClick={() => {
              const tspSetters = {
                setCurrentGraph: setCurrentGraph,
                setPosition: setPosition,
                setKey: setKey,
                setWaypoints: setWaypoints
              }
              TSPutils.onCitiesButtonClick(tspSetters)
            }}
          >Cities
          </Button>
          <Button
            size='sm'
            disabled={loading || TSPutils.isVancouverGraph(key)}
            onClick={() => {
              const tspSetters = {
                setCurrentGraph: setCurrentGraph,
                setPosition: setPosition,
                setKey: setKey,
                setWaypoints: setWaypoints
              }
              TSPutils.onVanButtonClick(tspSetters)
            }}
          >Vancouver
          </Button>
          <Button
            size='sm'
            disabled={loading || TSPutils.isFlowersGraph(key)}
            onClick={() => {
              // TODO
              TSPutils.onFlowersButtonClick(setCurrentGraph)
            }}
          >Flowers
          </Button>
        </ButtonGroup>
      </div>
      <div className={classes.tspInput}>
        <Button
          color='geeringupSecondary'
          disabled={loading || numSelectedNodes < 3 || isPathSolved}
          onClick={() => {
            setLoading(true)
            tspState.setIsLoading(true)

            const setters = {
              setIsPathSolved: setIsPathSolved,
              setLoading: setLoading
            }
            const consoleFns = {
              outputToConsole: props.outputToConsole,
              appendToConsole: props.appendToConsole
            }
            TSPutils.handleClickSolve(currentGraph, key, setters, consoleFns)
          }}
        >Solve
        </Button>
        <Button
          color='geeringupPrimary'
          disabled={loading || numSelectedNodes === 0 || !isPathSolved}
          onClick={() => {
            setLoading(true)
            tspState.setIsLoading(true)

            const keys = Object.keys(tspState.getCitiesMainMapMarkers())
            keys.forEach(key => {
              tspState.getCitiesMainMapMarkers()[key].fire('updating', TSPutils.getBlueIcon())
            })
            if (TSPutils.isCitiesGraph(key)) {
              Object.keys(tspState.getCitiesLines()).forEach(index => {
                tspState.getCitiesLines()[index].fire('reset')
              })
            } else {
              Object.keys(tspState.getVancouverLines()).forEach(index => {
                tspState.getVancouverLines()[index].fire('reset')
              })
            }
            tspState.resetGraphStates()

            setLoading(false)
            tspState.setIsLoading(false)

            setIsPathSolved(false)
            tspState.setIsPathSolved(false)

            setNumSelectedNodes(0)
          }}
        >Reset
        </Button>
        <Button
          color='geeringupSecondary'
          disabled={loading}
          onClick={() => {
            setLoading(true)
            tspState.setIsLoading(true)

            TSPutils.handleClickOpen('paper', setOpen, setScroll)

            setLoading(false)
            tspState.setIsLoading(false)
          }}
        >Full Screen
        </Button>
      </div>
      <Dialog
        open={open}
        fullScreen
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        maxWidth='false'
      >
        <DialogTitle id='scroll-dialog-title'>Full Screen</DialogTitle>
        <DialogContent className={classes.dialogContent} dividers={scroll === 'paper'}>
          <div className={TSPutils.isCitiesGraph(key) ? classes.expandedMap : classes.hidingContainer}>
            <Map
              position={position}
              isPathSolved={isPathSolved}
              waypoints={waypoints}
              currentGraph={currentGraph}
              Key={Keys.CITIES}
              loading={loading}
              setLoading={setLoading}
              fullScreen={open}
              setNumSelectedNodes={setNumSelectedNodes}
            />
          </div>
          <div className={key === Keys.VANCOUVER ? classes.expandedMap : classes.hidingContainer}>
            <Map
              position={position}
              isPathSolved={isPathSolved}
              waypoints={waypoints}
              currentGraph={currentGraph}
              Key={Keys.VANCOUVER}
              loading={loading}
              setLoading={setLoading}
              fullScreen={open}
              setNumSelectedNodes={setNumSelectedNodes}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              TSPutils.handleClose(setOpen, setLoading)
            }}
            color='geeringupSecondary'
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TravellingSalesperson
