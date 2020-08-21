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

  static handleClickSolve (graphParams, setters, consoleFns) {
    const key = graphParams.key
    const currentGraph = graphParams.currentGraph

    const selectedEdges = TSPutils.getEdgesToSolve(key, currentGraph)

    TSPutils.outputSendingToSolveToConsole(key, currentGraph, consoleFns.outputToConsole)

    const tspSolveRequestGraphParams = {
      selectedEdges: selectedEdges,
      key: key
    }
    tspSolveRequest(tspSolveRequestGraphParams, setters, consoleFns)
  }

  static getEdgesToSolve (graphKey, currentGraph) {
    let edgesToSolve = TSPutils.getSelectedEdges(graphKey, currentGraph)
    if (edgesToSolve.length === 0) {
      edgesToSolve = TSPutils.getAllEdges(currentGraph)
    }

    return edgesToSolve
  }

  static getSelectedEdges (graphKey, currentGraph) {
    const selectedEdges = []
    currentGraph.edgeList.forEach(edge => {
      if (TSPutils.isEdgeSelected(graphKey, edge)) {
        selectedEdges.push(edge)
      }
    })

    return selectedEdges
  }

  static getAllEdges (currentGraph) {
    const allEdges = []
    currentGraph.edgeList.forEach(edge => {
      if (!TSPutils.bothNodesInEdgeAreTheSame(edge)) {
        allEdges.push(edge)
      }
    })

    return allEdges
  }

  static isEdgeSelected (graphKey, edge) {
    return !TSPutils.bothNodesInEdgeAreTheSame(edge) &&
    TSPutils.isValInSelectedNodes(graphKey, edge[0]) &&
    TSPutils.isValInSelectedNodes(graphKey, edge[1])
  }

  static bothNodesInEdgeAreTheSame (edge) {
    return edge[0] === edge[1]
  }

  static isValInSelectedNodes (graphKey, val) {
    const tspState = TSPstate.getInstance()
    return tspState.getSelectedNodes(graphKey).has(val)
  }

  static outputSendingToSolveToConsole (graphKey, currentGraph, outputToConsole) {
    const tspState = TSPstate.getInstance()
    const selectedNodes = tspState.getSelectedNodes(graphKey)

    outputToConsole('Finding the shortest path between the following nodes:')

    if (selectedNodes.size === 0) {
      const names = Object.keys(currentGraph.nameMapping)
      TSPutils.outputNamesToConsole(names, outputToConsole)
    } else {
      const selectedNodesArray = Array.from(selectedNodes)
      TSPutils.outputSelectedNodesToConsole(selectedNodesArray, outputToConsole, currentGraph)
    }
  }

  static outputNamesToConsole (names, outputToConsole) {
    for (let i = 0; i < names.length; i++) {
      outputToConsole(`${i + 1}. ${names[i]}`)
    }
  }

  static outputSelectedNodesToConsole (selectedNodesArray, outputToConsole, currentGraph) {
    const idMapping = currentGraph.idMapping
    for (let i = 0; i < selectedNodesArray.length; i++) {
      outputToConsole(`${i + 1}. ${idMapping[selectedNodesArray[i]]}`)
    }
  }

  static onMarkerClick (graphKey, nodeId, consoleParams) {
    const tspState = TSPstate.getInstance()
    if (TSPutils.isMarkerDeselect(graphKey, nodeId)) {
      consoleParams.outputToConsole(`- Deselecting: ${consoleParams.nodeName}`)
      tspState.getSelectedNodes(graphKey).delete(nodeId)
    } else {
      consoleParams.outputToConsole(`Selecting: ${consoleParams.nodeName}`)
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

  static getZoom (key) {
    const tspState = TSPstate.getInstance()
    return tspState.getMapState(key).zoom
  }

  static getMaxBounds (key) {
    let maxBounds = null
    switch (key) {
      case Keys.CITIES:
        maxBounds = TSPutils.getCitiesMaxBounds()
        break
      case Keys.VANCOUVER:
        maxBounds = TSPutils.getVancouverMaxBounds()
        break
      default:
        break
    }

    return maxBounds
  }

  static getCitiesMaxBounds () {
    const southWestBound = L.latLng(15.597245, -148.269778)
    const northEastBound = L.latLng(64.099507, -51.894763)

    return L.latLngBounds(southWestBound, northEastBound)
  }

  static getVancouverMaxBounds () {
    const southWestBound = L.latLng(49.020672, -123.447644)
    const northEastBound = L.latLng(49.455436, -122.582183)

    return L.latLngBounds(southWestBound, northEastBound)
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
    return TSPutils.getMarker(TSPutils.getRedIcon(), latLng, popup)
  }

  static getBlueMarker (latLng, popup) {
    return TSPutils.getMarker(TSPutils.getBlueIcon(), latLng, popup)
  }

  static getMarker (icon, latLng, popup) {
    const marker = L.marker(latLng, {
      icon: icon,
      pane: 'customMarkerPane',
      keyboard: false,
      draggable: false
    }).bindPopup(popup)

    marker.on('mouseover', () => {
      const tspState = TSPstate.getInstance()
      if (!tspState.getIsLoading()) {
        marker.openPopup()
      }
    })
    marker.on('mouseout', () => {
      marker.closePopup()
    })

    return marker
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
