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

import './tsp.css'

function TravellingSalesperson (props) {
  const tspState = TSPstate.getInstance()

  // NOTE: The Cities Graph is used as the Default

  const [open, setOpen] = useState(false)
  const [currentGraph, setCurrentGraph] = useState(Graph[Keys.CITIES])
  const [position, setPosition] = useState([tspState.getCitiesState().lat, tspState.getCitiesState().lng])
  const [scroll, setScroll] = useState('paper')
  const [key, setKey] = useState(Keys.CITIES)
  const [waypoints, setWaypoints] = useState(TSPutils.getCitiesWaypoints())
  const [isCitiesPathSolved, setIsCitiesPathSolved] = useState(false)
  const [isVancouverPathSolved, setIsVancouverPathSolved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [numSelectedCitiesNodes, setNumSelectedCitiesNodes] = useState(0)
  const [numSelectedVancouverNodes, setNumSelectedVancouverNodes] = useState(0)
  const [switchingGraphs, setSwitchingGraphs] = useState({
    isGraphSwitch: false,
    key: null
  })

  const descriptionElementRef = useRef(null)

  const useStyles = makeStyles(styles)
  const classes = useStyles()

  const loadingContainerClasses = classNames({
    [classes.loadingContainer]: loading
  })

  const prevKey = usePrevious(key)
  const prevWaypoints = usePrevious(waypoints)

  /**
   * TODO: Confirm below is necessary
   *
   * Since setState() is an async function, we want to make sure all properties
   * of the graph being switched to are set
   *
   * Source: https://reactjs.org/docs/react-component.html#setstate
   */
  useEffect(() => {
    if (key !== prevKey && prevKey !== undefined) {
      tspState.setComponentsUpdated(tspState.getComponentsUpdated() + 1)
      if (allComponentsAreUpdated()) {
        onAllComponentsUpdated()
      }
    } // eslint-disable-next-line
  }, [key, prevKey])

  useEffect(() => {
    if (waypoints !== prevWaypoints && prevWaypoints !== undefined) {
      tspState.setComponentsUpdated(tspState.getComponentsUpdated() + 1)
      if (allComponentsAreUpdated()) {
        onAllComponentsUpdated()
      }
    } // eslint-disable-next-line
  }, [waypoints, prevWaypoints])

  useEffect(() => {},
    [numSelectedCitiesNodes, numSelectedVancouverNodes,
      isCitiesPathSolved, isVancouverPathSolved, switchingGraphs])

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

  useEffect(() => {}, [loading])

  // Source1: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
  // Source2: https://usehooks.com/usePrevious/
  function usePrevious (value) {
    const ref = useRef()

    useEffect(() => {
      ref.current = value
    }, [value])

    return ref.current
  }

  function allComponentsAreUpdated () {
    return tspState.getComponentsThatNeedUpdating() === tspState.getComponentsUpdated()
  }

  function onAllComponentsUpdated () {
    tspState.setComponentsUpdated(0)
    setSwitchingGraphs({
      isGraphSwitch: true,
      key: key
    })
  }

  /**
   * NOTE: We use TSPstate.js's getIsPathSolved(key).size since
   * the state values may not be updated immediately after setIsPathSolved()
   * is called since it calls async setters
   */
  function getIsPathSolved () {
    return tspState.getIsPathSolved(key)
  }

  function setIsPathSolved (value) {
    switch (key) {
      case Keys.CITIES:
        setIsCitiesPathSolved(value)
        break
      case Keys.VANCOUVER:
        setIsVancouverPathSolved(value)
        break
      default:
        break
    }
  }

  /**
   * NOTE: We use TSPstate.js's getSelectedNodeIds(key).size since
   * the state values may not be updated immediately after setNumSelectedNodes()
   * is called since it calls async setters
   */
  function getNumSelectedNodes () {
    return tspState.getSelectedNodeIds(key).size
  }

  function setNumSelectedNodes (value) {
    switch (key) {
      case Keys.CITIES:
        setNumSelectedCitiesNodes(value)
        break
      case Keys.VANCOUVER:
        setNumSelectedVancouverNodes(value)
        break
      default:
        break
    }
  }

  function onResetClick () {
    setLoading(true)
    tspState.setIsLoading(true)

    props.outputToConsole(`Resetting the ${key.toUpperCase()} graph...`)
    updateMainMapMarkers(key)
    resetGraphLines(key)
    tspState.resetGraphStates(key)

    setLoading(false)
    tspState.setIsLoading(false)

    setIsPathSolved(false)
    tspState.setIsPathSolved(key, false)

    setNumSelectedNodes(0)
  }

  function updateMainMapMarkers (key) {
    const mainMapMarkers = tspState.getMainMapMarkers(key)
    const keys = Object.keys(mainMapMarkers)
    keys.forEach(index => {
      mainMapMarkers[index].fire('updating', TSPutils.getBlueIcon())
    })
  }

  function resetGraphLines (key) {
    const graphLines = tspState.getLines(key)
    Object.keys(graphLines).forEach(index => {
      graphLines[index].fire('reset')
    })
  }

  return (
    <div className={classes.root}>
      <div className={loadingContainerClasses}>
        {loading && <CircularProgress size={68} className={classes.mapProgress} />}
        <div className={TSPutils.isCitiesGraph(key) ? classes.mapContainer : classes.hidingContainer}>
          <Map
            position={position}
            isPathSolved={isCitiesPathSolved}
            waypoints={TSPutils.getCitiesWaypoints()}
            currentGraph={Graph[Keys.CITIES]}
            Key={Keys.CITIES}
            loading={loading}
            setLoading={setLoading}
            setNumSelectedNodes={setNumSelectedNodes}
            switchingGraphs={switchingGraphs}
            setSwitchingGraphs={setSwitchingGraphs}
            outputToConsole={props.outputToConsole}
          />
        </div>
        <div className={key === Keys.VANCOUVER ? classes.mapContainer : classes.hidingContainer}>
          <Map
            position={position}
            isPathSolved={isVancouverPathSolved}
            waypoints={TSPutils.getVancouverWaypoints()}
            currentGraph={Graph[Keys.VANCOUVER]}
            Key={Keys.VANCOUVER}
            loading={loading}
            setLoading={setLoading}
            setNumSelectedNodes={setNumSelectedNodes}
            switchingGraphs={switchingGraphs}
            setSwitchingGraphs={setSwitchingGraphs}
            outputToConsole={props.outputToConsole}
          />
        </div>
      </div>
      <div className={classes.buttonGroup}>
        <ButtonGroup
          variant='contained'
          aria-label='contained primary button group'
        >
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
            color='geeringupSecondary'
          >
            Cities
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
            color='geeringupSecondary'
          >
            Vancouver
          </Button>
          <Button
            size='sm'
            disabled={loading || TSPutils.isFlowersGraph(key)}
            onClick={() => {
              props.outputToConsole('FLOWERS graph is coming soon!')
              // TODO
              // TSPutils.onFlowersButtonClick(setCurrentGraph)
            }}
            color='geeringupSecondary'
          >
            Flowers
          </Button>
        </ButtonGroup>
      </div>
      <div className={classes.tspInput}>
        <Button
          color='geeringupPrimary'
          disabled={loading || (getNumSelectedNodes() === 0 && !tspState.getIsPathSolved(key))}
          onClick={onResetClick}
        >
          Reset
        </Button>
        <Button
          color='geeringupSecondary'
          disabled={loading || (getNumSelectedNodes() < 3 && getNumSelectedNodes() !== 0) || getIsPathSolved()}
          onClick={() => {
            setLoading(true)
            tspState.setIsLoading(true)
            const graphParams = {
              currentGraph: currentGraph,
              key: key
            }
            const setters = {
              setIsPathSolved: setIsPathSolved,
              setLoading: setLoading
            }
            const consoleFns = {
              outputToConsole: props.outputToConsole,
              appendToConsole: props.appendToConsole
            }
            TSPutils.handleClickSolve(graphParams, setters, consoleFns)
          }}
        >
          Solve
        </Button>
        <Button
          color='geeringupPrimary'
          disabled={loading}
          onClick={() => {
            setLoading(true)
            tspState.setIsLoading(true)

            TSPutils.handleClickOpen('paper', setOpen, setScroll)

            setLoading(false)
            tspState.setIsLoading(false)
          }}
        >
          Full Screen
        </Button>
      </div>
      <Dialog
        open={open}
        fullScreen
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        maxWidth={false}
      >
        <DialogTitle id='scroll-dialog-title'>Full Screen</DialogTitle>
        <DialogContent className={classes.dialogContent} dividers={scroll === 'paper'}>
          <div className={TSPutils.isCitiesGraph(key) ? classes.expandedMap : classes.hidingContainer}>
            <Map
              position={position}
              isPathSolved={isCitiesPathSolved}
              waypoints={TSPutils.getCitiesWaypoints()}
              currentGraph={Graph[Keys.CITIES]}
              Key={Keys.CITIES}
              loading={loading}
              setLoading={setLoading}
              fullScreen
              setNumSelectedNodes={setNumSelectedNodes}
              switchingGraphs={switchingGraphs}
              setSwitchingGraphs={setSwitchingGraphs}
              outputToConsole={props.outputToConsole}
            />
          </div>
          <div className={key === Keys.VANCOUVER ? classes.expandedMap : classes.hidingContainer}>
            <Map
              position={position}
              isPathSolved={isVancouverPathSolved}
              waypoints={TSPutils.getVancouverWaypoints()}
              currentGraph={Graph[Keys.VANCOUVER]}
              Key={Keys.VANCOUVER}
              loading={loading}
              setLoading={setLoading}
              fullScreen
              setNumSelectedNodes={setNumSelectedNodes}
              switchingGraphs={switchingGraphs}
              setSwitchingGraphs={setSwitchingGraphs}
              outputToConsole={props.outputToConsole}
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
