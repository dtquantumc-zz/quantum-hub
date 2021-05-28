// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React, { useEffect, useState } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import Routing from './RoutingMachine'

import TSPstate from './TSPstate.js'
import TSPutils from './TSPutils'

import { makeStyles } from '@material-ui/core/styles'
import styles from '../../../assets/jss/material-kit-react/components/travellingSalespersonStyle.js'

/**
 * Key structure of this file was based on the Routing Machine solution
 * cited here:
 *
 * Source:
 *    Ghimire, A (2019) React leaflet-routing-machine example [Source Code].
 *    https://github.com/arjunghimire/react-leaflet-routing-machine-example.
 *
 * For more context, this solution is also linked in this discussion:
 * https://github.com/perliedman/leaflet-routing-machine/issues/400
 */

export default function MapComponent (props) {
  const useStyles = makeStyles(styles)
  const classes = useStyles()
  const [map, setMap] = useState(null)

  const tspState = TSPstate.getInstance()

  // TODO: Look into if this can be done inside a (i.e. useEffect) hook instead
  const saveMap = map => {
    tspState.setMap(props.Key, map)
    setMap(map)
  }

  // Used to do a refresh when the listed dependencies change
  useEffect(() => {},
    [map, props.position,
      props.isPathSolved, props.Key, props.fullScreen])

  useEffect(() => {
    if (map !== null) {
      map.leafletElement.invalidateSize()

      if (props.loading) {
        disableMapHandlers()
      } else {
        enableMapHandlers()
      }
    }
  })

  function disableMapHandlers () {
    getMapHandlersToToggle().forEach(handler => handler.disable())
  }

  function enableMapHandlers () {
    getMapHandlersToToggle().forEach(handler => handler.enable())
  }

  /**
   * NOTE: A list of all handlers can be found at
   * https://leafletjs.com/reference-1.6.0.html#handler
   * (Handler subsection under Map) or via the
   * map.leafletElement._handlers property
   */
  function getMapHandlersToToggle () {
    const leafletElem = map.leafletElement
    const mapHandlersToToggle = [
      leafletElem.boxZoom,
      leafletElem.dragging,
      leafletElem.keyboard,
      leafletElem.scrollWheelZoom,
      leafletElem.zoomControl,
      leafletElem.touchZoom
    ]

    if (leafletElem.tap) {
      mapHandlersToToggle.push(leafletElem.tap)
    }

    return mapHandlersToToggle
  }

  const attributionTemplate = '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  const attributionUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  let zoom = TSPutils.getZoom(props.Key, props.fullScreen)
  if (props.fullScreen) {
    zoom += 1
  }
  const maxBounds = TSPutils.getMaxBounds(props.Key)

  return (
    <>
      <Map
        className={props.fullScreen ? classes.expandedMap : classes.map}
        center={props.position}
        zoom={zoom}
        ref={saveMap}
        maxBounds={maxBounds}
        minZoom={zoom}
        doubleClickZoom={false}
      >
        <TileLayer attribution={attributionTemplate} url={attributionUrl} />
        {map !== null &&
          <Routing
            map={map}
            waypoints={props.waypoints}
            currentGraph={props.currentGraph}
            isPathSolved={props.isPathSolved}
            Key={props.Key}
            loading={props.loading}
            setLoading={props.setLoading}
            fullScreen={props.fullScreen}
            setNumSelectedNodes={props.setNumSelectedNodes}
            switchingGraphs={props.switchingGraphs}
            setSwitchingGraphs={props.setSwitchingGraphs}
            outputToConsole={props.outputToConsole}
          />}
      </Map>
    </>
  )
}
