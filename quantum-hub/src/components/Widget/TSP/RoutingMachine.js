
import 'leaflet-routing-machine'
import { MapLayer, withLeaflet } from 'react-leaflet'
import L from 'leaflet'
import TSPutils from './TSPutils.js'
import TSPstate from './TSPstate.js'
import PersistentGraph from './PersistentGraph'

import Graph from './Graph.js'

class Routing extends MapLayer {
  componentDidUpdate () {
    TSPstate.getInstance().setFullScreenMarkerLatLons(this.props.Key, new Set())

    if (this.graphTabIsBeingSwitched()) {
      this.props.setSwitchingGraphs({
        isGraphSwitch: false,
        key: null
      })
      this.createLeafletElement()
    }
  }

  graphTabIsBeingSwitched () {
    return (this.props.switchingGraphs.isGraphSwitch &&
      this.props.switchingGraphs.key === this.props.Key)
  }

  createLeafletElement () {
    const tspState = TSPstate.getInstance()
    tspState.setFullScreen(this.props.fullScreen) // used in Marker callbacks

    if (this.isFirstRoundRoutingCallForMainGraph() ||
    this.moreThanHalfCallsFailedForMainGraph()) {
      this.props.setLoading(true)
      tspState.setIsLoading(true)
    }
    this.fetchPath()

    return tspState.getFirstRoute(this.props.Key)
  }

  isFirstRoundRoutingCallForMainGraph () {
    const tspState = TSPstate.getInstance()
    return (!tspState.getFullScreen() &&
    tspState.getIsFirstRoundRoutingCall(this.props.Key))
  }

  moreThanHalfCallsFailedForMainGraph () {
    const tspState = TSPstate.getInstance()
    return this.moreThanHalfCallsFailed() && !tspState.getFullScreen()
  }

  moreThanHalfCallsFailed () {
    const tspState = TSPstate.getInstance()

    return (tspState.getNumFailedCalls(this.props.Key) >
    (this.props.waypoints.length / 2))
  }

  fetchPath () {
    const tspState = TSPstate.getInstance()

    this.initPanes()

    const { map, waypoints, currentGraph, Key } = this.props

    // console.log(waypoints)

    // const router = new L.Routing.osrmv1({})
    PersistentGraph.loadGraph()

    // console.log(waypoints)

    tspState.setCallsPending(Key, new Set())
    for (let i = 0; i < waypoints.length; i++) {
      const name = waypoints[i].names[0]
      const id = currentGraph.nameMapping[name]

      const popup = L.popup({
        pane: 'customPopupPane',
        closeOnClick: true,
        closeButton: false
      }).setContent(name)

      const waypointSource = { latLng: waypoints[i].waypoint[0] }
      const waypointDest = { latLng: waypoints[i].waypoint[1] }

      // i.e. "["UBC campus","SFU campus"]"
      const waypointKey = JSON.stringify(waypoints[i].names)
      // i.e. "UBC campus"
      const sourceKey = waypoints[i].names[0]

      const routingPlanOptions = this.getRoutingPlanOptionsOptions(sourceKey, popup, id)

      const routingPlan = L.Routing.plan(waypoints[i].waypoint, routingPlanOptions)

      if (TSPutils.isMainGraph(this.props.Key)) {
        // used in tspState.getFirstRoute()
        tspState.getRoute(this.props.Key)[waypointKey] = routingPlan
      }
      routingPlan.addTo(map.leafletElement)

      const isLineRoutePresent = tspState.getVancouverLineRoute().hasOwnProperty(i) && !!tspState.getVancouverLineRoute()
      const isFirstRoundRoutingCall = tspState.getIsFirstRoundRoutingCall(Key)

      if ((!isLineRoutePresent &&
        (isFirstRoundRoutingCall || this.moreThanHalfCallsFailed()) &&
        !tspState.getCallsPending(Key).has(i))) {
        tspState.getCallsPending(Key).add(i)

        if (i === waypoints.length - 1) {
          tspState.setNumFailedCalls(Key, 0)
          tspState.setIsFirstRoundRoutingCall(Key, false)
        }

        const line = null
        const blueLineStyles = TSPutils.getStyles('bluePane', TSPutils.getGeeringupPrimaryColor())

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

        // router.route([waypointSource, waypointDest], callback)
        // console.log("Accessing Vancouver Route")
        PersistentGraph.requestRoute([waypointSource, waypointDest], callback)
      } else {
        /** Don't want to add a line for a graph that
         * is not the current graph */
        if (!Graph[Key].nameMapping.hasOwnProperty(sourceKey)) {
          return
        }

        let line
        if (!this.props.fullScreen) {
          line = tspState.getLines(Key)[i]
        } else {
          const lineRoutes = tspState.getLineRoute(Key)[i]
          if (lineRoutes === undefined) {
            continue
          }

          let lineStyles = null
          if (tspState.getSolvedRouteIndexes(Key).has(i)) {
            lineStyles = TSPutils.getStyles('redPane', TSPutils.getGeeringupSecondaryColor())
          } else {
            lineStyles = TSPutils.getStyles('bluePane', TSPutils.getGeeringupPrimaryColor())
          }

          line = L.Routing.line(lineRoutes, {
            styles: lineStyles
          })
        }

        if (line === undefined) {
          continue
        }

        line = line.addTo(map.leafletElement)
      }
    }
  }

  initPanes () {
    if (!this.props.map.leafletElement.getPane('bluePane')) {
      this.initBluePane()
    }
    if (!this.props.map.leafletElement.getPane('redPane')) {
      this.initRedPane()
    }
    if (!this.props.map.leafletElement.getPane('customMarkerPane')) {
      this.initMarkerPane()
    }
    if (!this.props.map.leafletElement.getPane('customPopupPane')) {
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
          id: id,
          Key: this.props.Key
        }
        return this.createMarker(markerParams, routingMachineParams)
      }
    }
  }

  createMarker (markerParams, routingMachineParams) {
    const tspState = TSPstate.getInstance()

    const wp = markerParams.wp

    const sourceKey = routingMachineParams.sourceKey
    const popup = routingMachineParams.popup
    const id = routingMachineParams.id
    const Key = routingMachineParams.Key

    /** Don't want to create a marker for a graph that
     * is not the current graph */
    if (!Graph[Key].nameMapping.hasOwnProperty(sourceKey)) {
      return false
    }

    if (!tspState.getFullScreen()) {
      if (tspState.getMarkerLatLons(Key).has(sourceKey)) {
        return false
      }
      tspState.getMarkerLatLons(Key).add(sourceKey)
    } else {
      if (tspState.getFullScreenMarkerLatLons(Key).has(sourceKey)) {
        return false
      }
      tspState.getFullScreenMarkerLatLons(Key).add(sourceKey)
    }

    let marker = null
    if (tspState.getSelectedMarkers(Key).has(sourceKey)) {
      marker = TSPutils.getRedMarker(wp.latLng, popup)
    } else {
      marker = TSPutils.getBlueMarker(wp.latLng, popup)
    }

    const onClick = () => {
      this.onMarkerClick(sourceKey, marker, id)
    }

    marker.addEventListener('click', onClick)

    if (!tspState.getFullScreen()) {
      const onUpdating = (icon) => {
        marker.setIcon(icon)
      }
      marker.addEventListener('updating', onUpdating)

      if (!(tspState.getMainMapMarkers(Key).hasOwnProperty(sourceKey) && !!tspState.getMainMapMarkers(Key)[sourceKey])) {
        tspState.getMainMapMarkers(Key)[sourceKey] = marker
      }
    }

    return marker
  }

  onMarkerClick (sourceKey, marker, id) {
    marker.closePopup()

    const tspState = TSPstate.getInstance()

    const { Key, setNumSelectedNodes, outputToConsole } = this.props

    const isMainMapLoading = (!tspState.getFullScreen() && tspState.getIsLoading())
    if (isMainMapLoading) {
      outputToConsole('Map is Loading...')
      return
    }

    if (tspState.getIsPathSolved(Key)) {
      outputToConsole('A shortes path is already solved for.')
      outputToConsole("Please 'Reset' the map before selecting a new node")
      return
    }

    let icon = TSPutils.getBlueIcon()
    if (tspState.getSelectedMarkers(Key).has(sourceKey)) {
      tspState.getSelectedMarkers(Key).delete(sourceKey)
    } else {
      tspState.getSelectedMarkers(Key).add(sourceKey)
      icon = TSPutils.getRedIcon()
    }
    marker.setIcon(icon)

    const consoleParams = {
      outputToConsole: outputToConsole,
      nodeName: sourceKey
    }
    TSPutils.onMarkerClick(Key, id, consoleParams)
    setNumSelectedNodes(tspState.getSelectedNodes(Key).size)

    if (tspState.getFullScreen()) {
      const correspondingMarkerOnMainMap = tspState.getMainMapMarkers(Key)[sourceKey]
      correspondingMarkerOnMainMap.fire('updating', icon)
    }
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
      tspState.setNumFailedCalls(Key, tspState.getNumFailedCalls(Key) + 1)
      console.log(`Error in routing line ${i} for graph ${Key}: ${err.message}`)
    } else {
      // console.log("Trying to draw")
      // console.log(routes[0])
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
    // console.log(tspState.getLines(Key))
  }
}

export default withLeaflet(Routing)
