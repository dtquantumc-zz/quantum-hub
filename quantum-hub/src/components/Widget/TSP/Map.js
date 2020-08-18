// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import Routing from './RoutingMachine'

import TSPstate from './TSPstate.js'
import TSPutils from './TSPutils'

import { makeStyles } from '@material-ui/core/styles'
import styles from '../../../assets/jss/material-kit-react/components/travellingSalespersonStyle.js'

export default function MapComponent (props) {
  const useStyles = makeStyles(styles)
  const classes = useStyles()
  const [map, setMap] = React.useState(null)

  const tspState = TSPstate.getInstance()

  const saveMap = map => {
    TSPutils.isCitiesGraph(props.Key) ? tspState.setCitiesMap(map) : tspState.setVancouverMap(map)
    setMap(map)
  }

  // Used to do a refresh when the listed dependencies change
  React.useEffect(() => {}, [map, props.position, props.isPathSolved, props.Key, props.fullScreen])

  const attributionTemplate = '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  const attributionUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const zoom = TSPutils.getZoom(props.Key, props.fullScreen)

  return (
    <Map
      className={props.fullScreen ? classes.expandedMap : classes.map}
      center={props.position}
      zoom={zoom}
      ref={saveMap}
      zoomControl={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
    >
      <TileLayer attribution={attributionTemplate} url={attributionUrl} />
      {map !== null && <Routing
        map={map}
        waypoints={props.waypoints}
        currentGraph={props.currentGraph}
        isPathSolved={props.isPathSolved}
        Key={props.Key}
        loading={props.loading}
        setLoading={props.setLoading}
        fullScreen={props.fullScreen}
        setNumSelectedNodes={props.setNumSelectedNodes}
      />}
    </Map>
  )
}
