
import 'leaflet-routing-machine'
import { MapLayer, withLeaflet } from 'react-leaflet'
import L from 'leaflet'
import TSPutils from './TSPutils.js'
import TSPstate from './TSPstate.js'
import PersistentGraph from './PersistentGraph'

import Graph from './Graph.js'

class Routing extends MapLayer {
  componentDidUpdate () {
    this.resetFullScreenMarkerSourceKeys()
    this.checkToLoadNewGraph()
  }

  resetFullScreenMarkerSourceKeys () {
    const tspState = TSPstate.getInstance()
    tspState.setFullScreenMarkerSourceKeys(this.props.Key, new Set())
  }

  checkToLoadNewGraph () {
    if (this.graphTabIsBeingSwitched()) {
      this.switchToNewGraph()
    }
  }

  switchToNewGraph () {
    this.resetSwitchingGraphsProp()
    this.createLeafletElement()
  }

  resetSwitchingGraphsProp () {
    this.props.setSwitchingGraphs({
      isGraphSwitch: false,
      key: null
    })
  }

  graphTabIsBeingSwitched () {
    return (this.props.switchingGraphs.isGraphSwitch &&
      this.props.switchingGraphs.key === this.props.Key)
  }

  createLeafletElement () {
    const { fullScreen, Key, setLoading } = this.props
    const tspState = TSPstate.getInstance()
    tspState.setFullScreen(fullScreen) // used in Marker callbacks

    if (this.isFirstRoundRoutingCallForMainGraph()) {
      setLoading(true)
      tspState.setIsLoading(true)
    }
    this.fetchPath()

    return tspState.getFirstRoute(Key)
  }

  isFirstRoundRoutingCallForMainGraph () {
    const tspState = TSPstate.getInstance()
    return (!tspState.getFullScreen() &&
    tspState.getIsFirstRoundRoutingCall(this.props.Key))
  }

  fetchPath () {
    const tspState = TSPstate.getInstance()

    this.initPanes()

    const { map, waypoints, currentGraph, Key, fullScreen } = this.props

    PersistentGraph.loadGraph()

    tspState.setCallsPending(Key, new Set())
    /**
     * waypoints is an array of objects containing two key-value pairs
     * 1. waypoint: an array of two L.latLng objects representing
     * the source and destination waypoints respectively
     * 2. names: an array of two strings corresponding to the source and destination
     * waypoints respectively
     *
     * Refer to TSPutils.js > getGraphWaypoints() or getWaypointsSinglePath()
     * to see where such an array is created
     */
    for (let i = 0; i < waypoints.length; i++) {
      const name = waypoints[i].names[0]
      const id = currentGraph.nameMapping[name]

      const popup = TSPutils.getPopup(name)

      const waypointSource = { latLng: waypoints[i].waypoint[0] }
      const waypointDest = { latLng: waypoints[i].waypoint[1] }

      // i.e. "["UBC campus","SFU campus"]"
      const waypointKey = JSON.stringify(waypoints[i].names)
      // i.e. "UBC campus"
      const sourceKey = waypoints[i].names[0]

      const routingPlanOptions = this.getRoutingPlanOptionsOptions(sourceKey, popup, id)

      const routingPlan = L.Routing.plan(waypoints[i].waypoint, routingPlanOptions)

      if (TSPutils.isMainGraph(Key)) {
        // used in tspState.getFirstRoute()
        tspState.getRoute(Key)[waypointKey] = routingPlan
      }
      routingPlan.addTo(map.leafletElement)

      const isLineRoutePresent = tspState.getVancouverLineRoute().hasOwnProperty(i)
      const isFirstRoundRoutingCall = tspState.getIsFirstRoundRoutingCall(Key)

      if ((!isLineRoutePresent && isFirstRoundRoutingCall && !tspState.getCallsPending(Key).has(i))) {
        tspState.getCallsPending(Key).add(i)

        if (i === waypoints.length - 1) {
          tspState.setIsFirstRoundRoutingCall(Key, false)
        }

        const line = null
        const blueLineStyles = TSPutils.getRoutingLineStyles('bluePane', TSPutils.getGeeringupPrimaryColor())

        const callback = (err, routes) => {
          const callbackParams = {
            err: err,
            routes: routes
          }
          const lineParams = {
            line: line,
            blueLineStyles: blueLineStyles,
            i: i
          }
          this.getRoutingCallback(callbackParams, lineParams)
        }

        PersistentGraph.requestRoute([waypointSource, waypointDest], callback)
      } else {
        /** Don't want to add a line for a graph that
         * is not the current graph */
        if (!Graph[Key].nameMapping.hasOwnProperty(sourceKey)) { // eslint-disable-line no-prototype-builtins
          return
        }

        let line
        if (!fullScreen) {
          line = tspState.getLines(Key)[i]
        } else {
          const lineRoutes = tspState.getLineRoute(Key)[i]
          if (lineRoutes === undefined) {
            continue
          }

          line = L.Routing.line(lineRoutes, {
            styles: this.getLineStyles(i)
          })
        }

        if (line === undefined) {
          continue
        }

        line = line.addTo(map.leafletElement)
      }
    }
  }

  getLineStyles (index) {
    const tspState = TSPstate.getInstance()
    const { Key } = this.props

    let lineStyles = null
    if (tspState.getSolvedRouteIndexes(Key).has(index)) {
      lineStyles = TSPutils.getRoutingLineStyles('redPane', TSPutils.getGeeringupSecondaryColor())
    } else {
      lineStyles = TSPutils.getRoutingLineStyles('bluePane', TSPutils.getGeeringupPrimaryColor())
    }

    return lineStyles
  }

  /**
   * Inits the panes that the different map components will be placed on.
   * The panes specify the z-Index of the component hence different components
   * using different panes results in certain components rendering over others
   */
  initPanes () {
    const { map } = this.props
    if (!map.leafletElement.getPane('bluePane')) {
      this.initBluePane()
    }
    if (!map.leafletElement.getPane('redPane')) {
      this.initRedPane()
    }
    if (!map.leafletElement.getPane('customMarkerPane')) {
      this.initMarkerPane()
    }
    if (!map.leafletElement.getPane('customPopupPane')) {
      this.initPopupPane()
    }
  }

  initBluePane () {
    TSPutils.createBluePane(this.props.map)
  }

  initRedPane () {
    TSPutils.createRedPane(this.props.map)
  }

  initMarkerPane () {
    TSPutils.createMarkerPane(this.props.map)
  }

  initPopupPane () {
    TSPutils.createPopupPane(this.props.map)
  }

  getRoutingPlanOptionsOptions (sourceKey, popup, id) {
    return {
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      /**
       * Returning falsy values from createMarker()
       * will result in no marker being created
       */
      createMarker: (i, wp, n) => {
        const markerParams = {
          wp: wp
        }
        const routingMachineParams = {
          sourceKey: sourceKey,
          popup: popup,
          id: id
        }
        return this.createMarker(markerParams, routingMachineParams)
      }
    }
  }

  createMarker (markerParams, routingMachineParams) {
    const tspState = TSPstate.getInstance()
    const { Key } = this.props

    const wp = markerParams.wp

    const sourceKey = routingMachineParams.sourceKey
    const popup = routingMachineParams.popup
    const id = routingMachineParams.id

    if (this.isInvalidCreateMarkerCall(sourceKey)) {
      return false
    }

    const marker = this.getAppropriateColoredMarker(sourceKey, wp.latLng, popup)

    const onClick = () => {
      this.onMarkerClick(sourceKey, marker, id)
    }
    marker.addEventListener('click', onClick)

    if (!tspState.getFullScreen()) {
      const onUpdating = (icon) => {
        marker.setIcon(icon)
      }
      marker.addEventListener('updating', onUpdating)

      const mainMapMarkers = tspState.getMainMapMarkers(Key)
      if (!(mainMapMarkers.hasOwnProperty(sourceKey))) {
        mainMapMarkers[sourceKey] = marker
      }
    }

    return marker
  }

  isInvalidCreateMarkerCall (sourceKey) {
    const { Key } = this.props
    /** Don't want to create a marker for a graph that
     * is not the current graph */
    const sourceKeyIsForCurrentGraph = Graph[Key].nameMapping.hasOwnProperty(sourceKey)
    const markerAlreadyCreated = this.updateMarkerSourceKeys(sourceKey)

    return !sourceKeyIsForCurrentGraph || markerAlreadyCreated
  }

  getAppropriateColoredMarker (sourceKey, latLng, popup) {
    const tspState = TSPstate.getInstance()
    const { Key } = this.props

    let marker = null
    if (tspState.getSelectedMarkers(Key).has(sourceKey)) {
      marker = TSPutils.getRedMarker(latLng, popup)
    } else {
      marker = TSPutils.getBlueMarker(latLng, popup)
    }

    return marker
  }

  updateMarkerSourceKeys (sourceKey) {
    const tspState = TSPstate.getInstance()
    const { Key } = this.props

    let markerAlreadyCreated = false
    const markerLatLon = tspState.getMarkerSourceKeys(Key)
    if (markerLatLon.has(sourceKey)) {
      markerAlreadyCreated = true
    } else {
      markerLatLon.add(sourceKey)
    }

    return markerAlreadyCreated
  }

  onMarkerClick (sourceKey, marker, id) {
    marker.closePopup()

    const tspState = TSPstate.getInstance()
    const { Key, setNumSelectedNodes, outputToConsole } = this.props

    const handledInvalidClick = this.checkToHandleInvalidClick()
    if (handledInvalidClick) {
      return
    }

    const icon = this.getAppropriateColoredIcon(sourceKey)
    marker.setIcon(icon)
    this.updateSelectedMarkers(sourceKey)

    const consoleParams = {
      outputToConsole: outputToConsole,
      nodeName: sourceKey
    }
    TSPutils.onMarkerClick(Key, id, consoleParams)

    setNumSelectedNodes(tspState.getSelectedNodeIds(Key).size)

    if (tspState.getFullScreen()) {
      this.updateCorrespondingMarkerOnMainMap(sourceKey, icon)
    }
  }

  checkToHandleInvalidClick () {
    const tspState = TSPstate.getInstance()
    const { Key } = this.props

    let handledInvalidClick = true
    if (this.getIsMainMapLoading()) {
      this.handleMainMapLoading()
    } else if (tspState.getIsPathSolved(Key)) {
      this.handlePathAlreadySolved()
    } else {
      handledInvalidClick = false
    }

    return handledInvalidClick
  }

  // TODO: In some cases, while the path is solving,
  // the markers are clickable. This might have to do
  // with the isLoading field in TSPstate.js not being
  // set at the appropriate times and should be looked into
  getIsMainMapLoading () {
    const tspState = TSPstate.getInstance()
    return (!tspState.getFullScreen() && tspState.getIsLoading())
  }

  handleMainMapLoading () {
    const { outputToConsole } = this.props
    outputToConsole('Map is Loading...')
  }

  handlePathAlreadySolved () {
    const { outputToConsole } = this.props
    outputToConsole('A shortest path is already solved for.')
    outputToConsole("Please 'Reset' the map before selecting a new node")
  }

  updateSelectedMarkers (sourceKey) {
    const tspState = TSPstate.getInstance()
    const { Key } = this.props

    if (tspState.getSelectedMarkers(Key).has(sourceKey)) {
      tspState.getSelectedMarkers(Key).delete(sourceKey)
    } else {
      tspState.getSelectedMarkers(Key).add(sourceKey)
    }
  }

  getAppropriateColoredIcon (sourceKey) {
    const tspState = TSPstate.getInstance()
    const { Key } = this.props

    let icon
    if (tspState.getSelectedMarkers(Key).has(sourceKey)) {
      icon = TSPutils.getBlueIcon()
    } else {
      icon = TSPutils.getRedIcon()
    }

    return icon
  }

  updateCorrespondingMarkerOnMainMap (sourceKey, icon) {
    const tspState = TSPstate.getInstance()
    const { Key } = this.props

    const correspondingMarkerOnMainMap = tspState.getMainMapMarkers(Key)[sourceKey]
    correspondingMarkerOnMainMap.fire('updating', icon)
  }

  getRoutingCallback (callbackParams, lineParams) {
    const { map, Key, waypoints, setLoading, fullScreen } = this.props
    const err = callbackParams.err
    const routes = callbackParams.routes

    let line = lineParams.line
    const blueLineStyles = lineParams.blueLineStyles
    const i = lineParams.i

    const tspState = TSPstate.getInstance()
    // TODO: Investigate why in callback callsPending is always an empty set
    if (tspState.getCallsPending(Key).has(i)) {
      tspState.getCallsPending(Key).delete(i)
    }
    if (line) {
      map.leafletElement.removeLayer(line)
    }
    if (err) {
      console.log(`Error in routing line ${i} for graph ${Key}: ${err.message}`)
    } else {
      tspState.getLineRoute(Key)[i] = routes[0]

      line = L.Routing.line(routes[0], {
        styles: blueLineStyles
      })
      if (!fullScreen) {
        const tspSolvedEventFn = (waypointsInSolution) => {
          const lineInfo = {
            line: line,
            lineWaypoints: waypoints[i].waypoint,
            waypointsInSolution: waypointsInSolution,
            map: map,
            routes: routes[0],
            index: i
          }

          tspState.onTSPsolved(lineInfo, Key)
        }
        line.addEventListener('tspSolvedEvent', tspSolvedEventFn)
      }

      line = line.addTo(map.leafletElement)

      tspState.getLines(Key)[i] = line
    }
    if (!tspState.getFullScreen() && i === waypoints.length - 1) {
      setLoading(false)
      tspState.setIsLoading(false)
    }
  }
}

export default withLeaflet(Routing)
