// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import Keys from './Keys.js'
import Graph from './Graph.js'
import L from 'leaflet'
import TSPstate from './TSPstate.js'
import tspSolveRequest from './tspSolveRequest.js'

export default class TSPutils {
  static onCitiesButtonClick (tspSetters) {
    tspSetters.setKey(Keys.CITIES)
    tspSetters.setWaypoints(TSPutils.getCitiesWaypoints())

    TSPutils.loadCitiesGraph(tspSetters.setCurrentGraph)
    TSPutils.updatePosForCities(tspSetters.setPosition)
  }

  static onVanButtonClick (tspSetters) {
    tspSetters.setKey(Keys.VANCOUVER)
    tspSetters.setWaypoints(TSPutils.getVancouverWaypoints())

    TSPutils.loadVanCityGraph(tspSetters.setCurrentGraph)
    TSPutils.updatePosForVancouver(tspSetters.setPosition)
  }

  static onFlowersButtonClick () {
    // TODO
  }

  static getVancouverDefaultState () {
    return {
      lat: 49.246292,
      lng: -122.999000,
      zoom: 10
    }
  }

  static getCitiesDefaultState () {
    return {
      lat: 44.5260,
      lng: -105.2551,
      zoom: 3
    }
  }

  static updatePosForCities (setPosition) {
    const citiesState = TSPutils.getCitiesDefaultState()
    const tspState = TSPstate.getInstance()

    tspState.updateCitiesState(citiesState)
    setPosition([citiesState.lat, citiesState.lng])
  }

  static updatePosForVancouver (setPosition) {
    const vancouverState = TSPutils.getVancouverDefaultState()
    const tspState = TSPstate.getInstance()

    tspState.updateVancouverState(vancouverState)
    setPosition([vancouverState.lat, vancouverState.lng])
  }

  static loadCitiesGraph (setCurrentGraph) {
    setCurrentGraph(Graph[Keys.CITIES])
  }

  static loadVanCityGraph (setCurrentGraph) {
    setCurrentGraph(Graph[Keys.VANCOUVER])
  }

  static loadFlowersGraph (setCurrentGraph) {
    // TODO
  }

  static getCitiesWaypoints () {
    return TSPutils.getGraphWaypoints(Graph[Keys.CITIES])
  }

  static getVancouverWaypoints () {
    return TSPutils.getGraphWaypoints(Graph[Keys.VANCOUVER])
  }

  static getGraphWaypoints (graph) {
    const edgeList = graph.edgeList
    const latLong = graph.latLong
    const idMapping = graph.idMapping // TODO: Currently the Flower graph does not have these

    const waypoints = []
    for (let i = 0; i < edgeList.length; i++) {
      const sourceId = edgeList[i][0]
      const destId = edgeList[i][1]

      const sourceName = idMapping[sourceId]
      const destName = idMapping[destId]

      const sourceLatLng = latLong[sourceName]
      const destLatLng = latLong[destName]

      const waypoint = TSPutils.getWaypointsfromCoords(sourceLatLng, destLatLng)
      const names = [sourceName, destName]

      const waypointData = {
        waypoint: waypoint,
        names: names
      }

      waypoints.push(waypointData)
    }

    return waypoints
  }

  static getWaypointsfromCoords (sourceLatLng, destLatLng) {
    const sourceLat = sourceLatLng[0]
    const sourceLng = sourceLatLng[1]
    const destLat = destLatLng[0]
    const destLng = destLatLng[1]

    const sourceWaypoint = L.latLng(sourceLat, sourceLng)
    const destWaypoint = L.latLng(destLat, destLng)

    return [sourceWaypoint, destWaypoint]
  }

  static getWaypointsSinglePath (graph, nodes) {
    const latLong = graph.latLong
    const idMapping = graph.idMapping // TODO: Currently the Flower graph does not have these

    const waypoints = []
    for (let i = 0; i < nodes.length; i++) {
      const sourceId = nodes[i]
      const destId = nodes[(i + 1) % nodes.length]

      const sourceName = idMapping[sourceId]
      const destName = idMapping[destId]

      const sourceLatLng = latLong[sourceName]
      const destLatLng = latLong[destName]

      const waypoint = TSPutils.getWaypointsfromCoords(sourceLatLng, destLatLng)
      const names = [sourceName, destName]

      const waypointData = {
        waypoint: waypoint,
        names: names
      }

      waypoints.push(waypointData)
    }

    return waypoints
  }

  static handleClickSolve (currentGraph, key, setters, consoleFns) {
    const tspState = TSPstate.getInstance()
    const selectedNodes = tspState.getSelectedNodes(key)
    console.log('selectedNodes: ', selectedNodes)

    const selectedEdges = []
    currentGraph.edgeList.forEach(edge => {
      if (TSPutils.isEdgeSelected(key, edge)) {
        selectedEdges.push(edge)
      }
    })

    console.log('selectedEdges: ', selectedEdges)
    tspSolveRequest(selectedEdges, key, setters, consoleFns)
  }

  static isEdgeSelected (graphKey, edge) {
    return TSPutils.isValInSelectedNodes(graphKey, edge[0]) &&
    TSPutils.isValInSelectedNodes(graphKey, edge[1])
  }

  static isValInSelectedNodes (graphKey, val) {
    const tspState = TSPstate.getInstance()
    return tspState.getSelectedNodes(graphKey).has(val)
  }

  static onMarkerClick (graphKey, nodeId) {
    const tspState = TSPstate.getInstance()
    if (TSPutils.isMarkerDeselect(graphKey, nodeId)) {
      console.log('Deselecting ', nodeId)
      tspState.getSelectedNodes(graphKey).delete(nodeId)
    } else {
      console.log('Selecting ', nodeId)
      tspState.getSelectedNodes(graphKey).add(nodeId)
    }
  }

  static isMarkerDeselect (graphKey, nodeId) {
    const tspState = TSPstate.getInstance()
    return tspState.getSelectedNodes(graphKey).has(nodeId)
  }

  static isMainGraph (key) {
    return TSPutils.isCitiesMainGraph(key) || TSPutils.isVancouverMainGraph(key)
  }

  static isCitiesMainGraph (key) {
    const tspState = TSPstate.getInstance()
    return TSPutils.isCitiesGraph(key) && !tspState.getFullScreen()
  }

  static isVancouverMainGraph (key) {
    const tspState = TSPstate.getInstance()
    return TSPutils.isVancouverGraph(key) && !tspState.getFullScreen()
  }

  static isCitiesGraph (key) {
    return key === Keys.CITIES
  }

  static isVancouverGraph (key) {
    return key === Keys.VANCOUVER
  }

  static isFlowersGraph (key) {
    return key === Keys.FLOWERS
  }

  static handleClickOpen (scrollType, setOpen, setScroll) {
    setOpen(true)
    setScroll(scrollType)
  }

  static handleClose (setOpen, setLoading) {
    const tspState = TSPstate.getInstance()

    setOpen(false)
    setLoading(false)
    tspState.setIsLoading(false)
  }

  static getGeeringupPrimaryColor () {
    return '#50C8EB'
  }

  static getGeeringupSecondaryColor () {
    return '#D96262'
  }

  static getStyles (pane, color) {
    return [
      { pane: pane, color: 'black', opacity: 0.15, weight: 9 },
      { pane: pane, color: 'white', opacity: 0.8, weight: 6 },
      { pane: pane, color: color, opacity: 1, weight: 2 }
    ]
  }

  static getZoom (key, isFullScreen) {
    const tspState = TSPstate.getInstance()

    let zoom = null
    if (TSPutils.isCitiesGraph(key)) {
      zoom = tspState.getCitiesState().zoom
    } else {
      zoom = tspState.getVancouverState().zoom
    }

    return zoom
  }

  static getRedIcon () {
    return L.icon({
      iconUrl: require('../../../images/RedMarker.png'),
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    })
  }

  static getBlueIcon () {
    return L.icon({
      iconUrl: require('../../../images/BlueMarker.png'),
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    })
  }

  static getRedMarker (latLng, popup) {
    return L.marker(latLng, {
      icon: TSPutils.getRedIcon(),
      pane: 'customMarkerPane',
      keyboard: false,
      draggable: false
    }).bindPopup(popup)
  }

  static getBlueMarker (latLng, popup) {
    return L.marker(latLng, {
      icon: TSPutils.getBlueIcon(),
      pane: 'customMarkerPane',
      keyboard: false,
      draggable: false
    }).bindPopup(popup)
  }

  static createBluePane (map) {
    const bluePane = map.leafletElement.createPane('bluePane')
    bluePane.style.zIndex = ''
  }

  static createRedPane (map) {
    const redPane = map.leafletElement.createPane('redPane')
    redPane.style.zIndex = 1000
  }

  static createMarkerPane (map) {
    const markerPane = map.leafletElement.createPane('customMarkerPane')
    markerPane.style.zIndex = 2000
  }

  static createPopupPane (map) {
    const popupPane = map.leafletElement.createPane('customPopupPane')
    popupPane.style.zIndex = 3000
  }

  static isNonNegNumber (value) {
    return /^\d+$/.test(value)
  }

  static doStartAndEndWaypointsMatch (lineWaypoints, startWaypoint, endWaypoint) {
    return (TSPutils.doesStartWaypointMatch(lineWaypoints, startWaypoint) &&
    TSPutils.doesEndWaypointMatch(lineWaypoints, endWaypoint))
  }

  static doesStartWaypointMatch (lineWaypoints, startWaypoint) {
    const lineStartWaypoint = lineWaypoints[0]
    const lineStartLat = lineStartWaypoint.lat
    const lineStartLng = lineStartWaypoint.lng

    const lineEndWaypoint = lineWaypoints[1]
    const lineEndLat = lineEndWaypoint.lat
    const lineEndLng = lineEndWaypoint.lng

    const startLat = startWaypoint.lat
    const startLng = startWaypoint.lng

    const startWaypointMatches = ((lineStartLat === startLat && lineStartLng === startLng) ||
    (lineEndLat === startLat && lineEndLng === startLng))

    return startWaypointMatches
  }

  static doesEndWaypointMatch (lineWaypoints, endWaypoint) {
    const lineStartWaypoint = lineWaypoints[0]
    const lineStartLat = lineStartWaypoint.lat
    const lineStartLng = lineStartWaypoint.lng

    const lineEndWaypoint = lineWaypoints[1]
    const lineEndLat = lineEndWaypoint.lat
    const lineEndLng = lineEndWaypoint.lng

    const endLat = endWaypoint.lat
    const endLng = endWaypoint.lng

    const endWaypointMatches = ((lineStartLat === endLat && lineStartLng === endLng) ||
    (lineEndLat === endLat && lineEndLng === endLng))

    return endWaypointMatches
  }
}
