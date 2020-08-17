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
  static onCitiesButtonClick (tspSetters, tspStateSetters) {
    tspSetters.setKey(Keys.CITIES)
    tspSetters.setWaypoints(TSPutils.getCitiesWaypoints())

    TSPutils.loadCitiesGraph(tspSetters.setCurrentGraph)
    TSPutils.updatePosForCities(tspSetters.setPosition, tspStateSetters.setCitiesState)
  }

  static onVanButtonClick (tspSetters, tspStateSetters) {
    tspSetters.setKey(Keys.VANCOUVER)
    tspSetters.setWaypoints(TSPutils.getVancouverWaypoints())

    TSPutils.loadVanCityGraph(tspSetters.setCurrentGraph)
    TSPutils.updatePosForVancouver(tspSetters.setPosition, tspStateSetters.setVancouverState)
  }

  static onFlowersButtonClick (setCurrentGraph) {
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
    // center of NA
    return {
      lat: 54.5260,
      lng: -105.2551,
      zoom: 3
    }
  }

  static updatePosForCities (setPosition, setState) {
    const citiesState = TSPutils.getCitiesDefaultState()
    setState(citiesState)
    setPosition([citiesState.lat, citiesState.lng])
  }

  static updatePosForVancouver (setPosition, setState) {
    const vancouverState = TSPutils.getVancouverDefaultState()
    setState(vancouverState)
    setPosition([vancouverState.lat, vancouverState.lng])
  }

  static loadCitiesGraph (setCurrentGraph) {
    setCurrentGraph(Graph[Keys.CITIES])
  }

  static loadVanCityGraph (setCurrentGraph) {
    setCurrentGraph(Graph[Keys.VANCOUVER])
  }

  static loadFlowersGraph (setCurrentGraph) {

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
    setters.setPathIsSolving(true)

    const tspState = TSPstate.getInstance()
    const selectedNodes = tspState.getSelectedNodes()
    console.log('selectedNodes: ', selectedNodes)

    const selectedEdges = []
    currentGraph.edgeList.forEach(edge => {
      if (TSPutils.isEdgeSelected(edge)) {
        selectedEdges.push(edge)
      }
    })

    console.log('selectedEdges: ', selectedEdges)
    tspSolveRequest(selectedEdges, key, setters, consoleFns)
  }

  static isEdgeSelected (edge) {
    return TSPutils.isValInSelectedNodes(edge[0]) &&
    TSPutils.isValInSelectedNodes(edge[1])
  }

  static isValInSelectedNodes (val) {
    const tspState = TSPstate.getInstance()
    return tspState.getSelectedNodes().has(val)
  }

  static onMarkerClick (nodeId) {
    const tspState = TSPstate.getInstance()
    if (TSPutils.isMarkerDeselect(nodeId)) {
      console.log('Deselecting ', nodeId)
      tspState.setSelectedNodes(tspState.getSelectedNodes().delete(nodeId))
    } else {
      console.log('Selecting ', nodeId)
      tspState.setSelectedNodes(tspState.getSelectedNodes().add(nodeId))
    }
  }

  static isMarkerDeselect (nodeId) {
    const tspState = TSPstate.getInstance()
    return tspState.getSelectedNodes().has(nodeId)
  }

  static isCitiesGraph (key) {
    return key === Keys.CITIES
  }

  static isVancouverGraph (key) {
    return key === Keys.VANCOUVER
  }

  static handleClickOpen (scrollType, setOpen, setScroll) {
    setOpen(true)
    setScroll(scrollType)
  }

  static handleClose (setOpen, setLoading) {
    setOpen(false)
    setLoading(false)
  }
}
