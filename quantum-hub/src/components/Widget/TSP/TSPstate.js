// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import L from 'leaflet'
import TSPutils from './TSPutils.js'

class TSPstate {
  static instance = null

  isCitiesFirstRoundRoutingCall = true
  isVancouverFirstRoundRoutingCall = true

  isLoading = false

  isPathSolved = false

  solvingState = ''

  callsPending = new Set()

  citiesMainMapMarkers = {}
  citiesMap = null
  vancouverMap = null

  citiesState = {
    lat: 44.5260,
    lng: -105.2551,
    zoom: 4
  }
  vancouverState = {
    lat: 49.246292,
    lng: -122.999000,
    zoom: 11
  }

  citiesRoute = {}
  vancouverRoute = {}

  citiesLineRoute = {}
  vancouverLineRoute = {}

  citiesLines = {}
  vancouverLines = {}

  selectedNodes = new Set()
  selectedMarkers = new Set()

  markerLatLons = new Set()
  fullScreenMarkerLatLons = new Set()

  fullScreen = false

  solvedRouteIndexes = new Set()

  static getInstance () {
    if (TSPstate.instance == null) {
      TSPstate.instance = new TSPstate()
    }

    return this.instance
  }

  getIsCitiesFirstRoundRoutingCall () {
    return this.isCitiesFirstRoundRoutingCall
  }

  getIsVancouverFirstRoundRoutingCall () {
    return this.isVancouverFirstRoundRoutingCall
  }

  getIsLoading () {
    return this.isLoading
  }

  getIsPathSolved () {
    return this.isPathSolved
  }

  getSolvingState () {
    return this.solvingState
  }

  getCallsPending () {
    return this.callsPending
  }

  getCitiesMainMapMarkers () {
    return this.citiesMainMapMarkers
  }

  getCitiesMap () {
    return this.citiesMap
  }

  getVancouverMap () {
    return this.vancouverMap
  }

  getCitiesState () {
    return this.citiesState
  }

  getVancouverState () {
    return this.vancouverState
  }

  getCitiesRoute () {
    return this.citiesRoute
  }

  getVancouverRoute () {
    return this.vancouverRoute
  }

  getCitiesLineRoute () {
    return this.citiesLineRoute
  }

  getVancouverLineRoute () {
    return this.vancouverLineRoute
  }

  getCitiesLines () {
    return this.citiesLines
  }

  getVancouverLines () {
    return this.vancouverLines
  }

  getSelectedNodes () {
    return this.selectedNodes
  }

  getSelectedMarkers () {
    return this.selectedMarkers
  }

  getMarkerLatLons () {
    return this.markerLatLons
  }

  getFullScreenMarkerLatLons () {
    return this.fullScreenMarkerLatLons
  }

  getFullScreen () {
    return this.fullScreen
  }

  getSolvedRouteIndexes () {
    return this.solvedRouteIndexes
  }

  setIsCitiesFirstRoundRoutingCall (value) {
    this.isCitiesFirstRoundRoutingCall = value
  }

  setIsVancouverFirstRoundRoutingCall (value) {
    this.isVancouverFirstRoundRoutingCall = value
  }

  setIsLoading (value) {
    this.isLoading = value
  }

  setIsPathSolved (value) {
    this.isPathSolved = value
  }

  setSolvingState (value) {
    this.solvingState = value
  }

  setCallsPending (value) {
    this.callsPending = value
  }

  setCitiesMainMapMarkers (value) {
    this.citiesMainMapMarkers = value
  }

  setCitiesMap (value) {
    this.citiesMap = value
  }

  setVancouverMap (value) {
    this.vancouverMap = value
  }

  updateCitiesState (newState) {
    this.citiesState = { ...this.citiesState, ...newState }
  }

  updateVancouverState (newState) {
    this.vancouverState = { ...this.vancouverState, ...newState }
  }

  setCitiesRoute (value) {
    this.citiesRoute = value
  }

  setVancouverRoute (value) {
    this.vancouverRoute = value
  }

  setCitiesLineRoute (value) {
    this.citiesLineRoute = value
  }

  setVancouverLineRoute (value) {
    this.vancouverLineRoute = value
  }

  setCitiesLines (value) {
    this.citiesLines = value
  }

  setVancouverLines (value) {
    this.vancouverLines = value
  }

  setSelectedNodes (value) {
    this.selectedNodes = value
  }

  setSelectedMarkers (value) {
    this.selectedMarkers = value
  }

  setMarkerLatLons (value) {
    this.markerLatLons = value
  }

  setFullScreenMarkerLatLons (value) {
    this.fullScreenMarkerLatLons = value
  }

  setFullScreen (value) {
    this.fullScreen = value
  }

  setSolvedRouteIndexes (value) {
    this.solvedRouteIndexes = value
  }

  onReset (lineInfo, tspSolvedEventListenerInfo, key) {
    if (!lineInfo.shouldLineBeReset) {
      return
    }

    const oldLine = lineInfo.oldLine
    const index = lineInfo.index
    const map = lineInfo.map
    const waypoints = lineInfo.waypoints

    const routes = tspSolvedEventListenerInfo.routes

    map.leafletElement.removeLayer(oldLine)

    let lineRoute
    if (TSPutils.isCitiesGraph(key)) {
      lineRoute = this.getCitiesLineRoute()[index]
    } else {
      lineRoute = this.getVancouverLineRoute()[index]
    }

    let newLine = L.Routing.line(lineRoute, {
      styles: TSPutils.getStyles('bluePane', TSPutils.getGeeringupPrimaryColor())
    })
    const tspSolvedEventListener = (waypointsInSolution) => {
      const lineInfo = {
        line: newLine,
        lineWaypoints: waypoints,
        waypointsInSolution: waypointsInSolution,
        map: map,
        routes: routes,
        index: index
      }

      this.onTSPsolved(lineInfo, key)
    }
    const tspOnResetEventFn = () => {
      const lineInfo = {
        oldLine: newLine,
        index: index,
        map: map,
        waypoints: waypoints
      }
      const tspSolvedEventListenerInfo = {
        routes: routes
      }
      this.onReset(lineInfo, tspSolvedEventListenerInfo, key)
    }
    newLine.addEventListener('tspSolvedEvent', tspSolvedEventListener)
    newLine.addEventListener('reset', tspOnResetEventFn)
    newLine = newLine.addTo(map.leafletElement)

    if (TSPutils.isCitiesGraph(key)) {
      this.addToCitiesLines(index, newLine)
    } else {
      this.addToVancouverLines(index, newLine)
    }
  }

  onTSPsolved (lineInfo, key) {
    const line = lineInfo.line
    const lineWaypoints = lineInfo.lineWaypoints
    const waypointsInSolution = lineInfo.waypointsInSolution
    const map = lineInfo.map
    const routes = lineInfo.routes
    const index = lineInfo.index

    const keys = Object.keys(waypointsInSolution)
    for (let i = 0; i < keys.length; i++) {
      if (!TSPutils.isNonNegNumber(keys[i])) {
        break
      }

      const startWaypoint = waypointsInSolution[keys[i]].waypoint[0]
      const endWaypoint = waypointsInSolution[keys[i]].waypoint[1]

      if (TSPutils.doStartAndEndWaypointsMatch(lineWaypoints, startWaypoint, endWaypoint)) {
        const shouldLineBeReset = true

        this.addToSolvedRouteIndexes(index)
        map.leafletElement.removeLayer(line)

        let newLine = L.Routing.line(routes, {
          styles: TSPutils.getStyles('redPane', TSPutils.getGeeringupSecondaryColor())
        })
        const tspSolvedEventFn = (waypointsInSolution) => {
          const lineInfo = {
            line: newLine,
            lineWaypoints: lineWaypoints,
            waypointsInSolution: waypointsInSolution,
            map: map,
            routes: routes,
            index: index
          }
          this.onTSPsolved(lineInfo, key)
        }
        const tspOnResetEventFn = () => {
          const lineInfo = {
            oldLine: newLine,
            index: index,
            map: map,
            waypoints: lineWaypoints,
            shouldLineBeReset: shouldLineBeReset
          }
          const tspSolvedEventListenerInfo = {
            routes: routes
          }
          this.onReset(lineInfo, tspSolvedEventListenerInfo, key)
        }

        newLine.addEventListener('tspSolvedEvent', tspSolvedEventFn)
        newLine.addEventListener('reset', tspOnResetEventFn)
        newLine = newLine.addTo(map.leafletElement)

        if (TSPutils.isCitiesGraph(key)) {
          this.addToCitiesLines(index, newLine)
        } else {
          this.addToVancouverLines(index, newLine)
        }
      }
    }
  }

  resetGraphStates () {
    this.setSelectedNodes(new Set())
    this.setSelectedMarkers(new Set())
    this.setSolvedRouteIndexes(new Set())
  }

  addToCallsPending (index) {
    const callsPending = this.getCallsPending()
    callsPending.add(index)
  }

  removeFromCallsPending (index) {
    const callsPending = this.getCallsPending()
    callsPending.delete(index)
  }

  addToCitiesMainMapMarkers (key, value) {
    const markers = this.getCitiesMainMapMarkers()
    markers[key] = value
  }

  addToCitiesRoute (key, value) {
    const route = this.getCitiesRoute()
    route[key] = value
  }

  addToVancouverRoute (key, value) {
    const route = this.getVancouverRoute()
    route[key] = value
  }

  addToCitiesLines (key, value) {
    const citiesLines = this.getCitiesLines()
    citiesLines[key] = value
  }

  addToVancouverLines (key, value) {
    const vancouverLines = this.getVancouverLines()
    vancouverLines[key] = value
  }

  addToSelectedNodes (key) {
    const selectedNodes = this.getSelectedNodes()
    selectedNodes.add(key)
  }

  removeFromSelectedNodes (key) {
    const selectedNodes = this.getSelectedNodes()
    selectedNodes.delete(key)
  }

  addToSelectedMarkers (key) {
    const selectedMarkers = this.getSelectedMarkers()
    selectedMarkers.add(key)
  }

  removeFromSelectedMarkers (key) {
    const selectedMarkers = this.getSelectedMarkers()
    selectedMarkers.delete(key)
  }

  addToMarkerLatLons (key) {
    const markersLatLons = this.getMarkerLatLons()
    markersLatLons.add(key)
  }

  addToFullScreenMarkerLatLons (key) {
    const fullScreenMarkerLatLons = this.getFullScreenMarkerLatLons()
    fullScreenMarkerLatLons.add(key)
  }

  addToSolvedRouteIndexes (index) {
    const solvedRouteIndexes = this.getSolvedRouteIndexes()
    solvedRouteIndexes.add(index)
  }
}

export default TSPstate
