
import 'leaflet-routing-machine'
import { MapLayer, withLeaflet } from 'react-leaflet'
import L from 'leaflet'
import Keys from './Keys.js'
import TSPutils from './TSPutils.js'
import TSPstate from './TSPstate.js'

class Routing extends MapLayer {
  componentDidUpdate () {
    TSPstate.getInstance().setFullScreenMarkerLatLons(new Set())
  }

  createLeafletElement () {
    const tspState = TSPstate.getInstance()
    tspState.setFullScreen(this.props.fullScreen) // used in Marker callbacks

    if (!tspState.getFullScreen()) {
      this.props.setLoading(true)
      tspState.setIsLoading(true)
    }
    this.fetchPath()

    return this.getFirstRoute()
  }

  getFirstRoute () {
    let plan = null
    switch (this.props.Key) {
      case Keys.CITIES:
        plan = this.getCitiesFirstRoute()
        break
      case Keys.VANCOUVER:
        plan = this.getVancouverFirstRoute()
        break
      case Keys.FLOWERS:
        console.log('TODO: implement getFirstRoute() FLowers case')
        break
    }

    return plan
  }

  getCitiesFirstRoute () {
    const tspState = TSPstate.getInstance()
    const firstKey = Object.keys(tspState.getCitiesRoute())[0]
    return tspState.getCitiesRoute()[firstKey]
  }

  getVancouverFirstRoute () {
    const tspState = TSPstate.getInstance()
    const firstKey = Object.keys(tspState.getVancouverRoute())[0]
    return tspState.getVancouverRoute()[firstKey]
  }

  fetchPath () {
    const tspState = TSPstate.getInstance()

    this.initPanes()

    const { map, waypoints, currentGraph, Key } = this.props

    const router = new L.Routing.osrmv1({})

    tspState.setCallsPending(new Set())
    for (let i = 0; i < waypoints.length; i++) {
      const name = waypoints[i].names[0]
      const id = currentGraph.nameMapping[name]

      const popup = L.popup({ pane: 'popupPane' }).setContent(name)

      const waypointSource = { latLng: waypoints[i].waypoint[0] }
      const waypointDest = { latLng: waypoints[i].waypoint[1] }

      const waypointKey = JSON.stringify(waypoints[i].names)
      const sourceKey = JSON.stringify(waypoints[i].names[0])

      const leafletElemetOptions = this.getLeafletElementOptions(sourceKey, popup, id)

      const routingPlan = L.Routing.plan(waypoints[i].waypoint, leafletElemetOptions)

      if (TSPutils.isCitiesMainGraph(this.props.Key)) {
        tspState.addToCitiesRoute(waypointKey, routingPlan)
      } else if (TSPutils.isVancouverMainGraph(this.props.Key)) {
        tspState.addToVancouverRoute(waypointKey, routingPlan)
      }
      routingPlan.addTo(map.leafletElement)

      let isRouteForLinePresent = false
      let isFirstRoundRoutingCall = false
      if (TSPutils.isCitiesGraph(Key)) {
        isRouteForLinePresent = tspState.getCitiesLineRoute().hasOwnProperty(i) && !!tspState.getCitiesLineRoute()
        isFirstRoundRoutingCall = tspState.getIsCitiesFirstRoundRoutingCall()
      } else if (TSPutils.isVancouverGraph(Key)) {
        isRouteForLinePresent = tspState.getVancouverLineRoute().hasOwnProperty(i) && !!tspState.getVancouverLineRoute()
        isFirstRoundRoutingCall = tspState.getIsVancouverFirstRoundRoutingCall()
      }
      if (!isRouteForLinePresent && isFirstRoundRoutingCall && !tspState.getCallsPending().has(i)) {
        tspState.addToCallsPending(i)

        if (i === waypoints.length - 1) {
          if (TSPutils.isCitiesGraph(Key)) {
            tspState.setIsCitiesFirstRoundRoutingCall(false)
          } else if (TSPutils.isVancouverGraph(Key)) {
            tspState.setIsVancouverFirstRoundRoutingCall(false)
          }
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

        router.route([waypointSource, waypointDest], callback)
      } else {
        let lineRoutes = null
        if (TSPutils.isCitiesGraph(Key)) {
          lineRoutes = tspState.getCitiesLineRoute()[i]
        } else {
          lineRoutes = tspState.getVancouverLineRoute()[i]
        }

        if (lineRoutes === undefined) {
          continue
        }

        let lineColor = null
        let pane = null
        if (tspState.getSolvedRouteIndexes().has(i)) {
          lineColor = TSPutils.getGeeringupSecondaryColor()
          pane = 'redPane'
        } else {
          lineColor = TSPutils.getGeeringupPrimaryColor()
          pane = 'bluePane'
        }

        let line = L.Routing.line(lineRoutes, {
          styles: TSPutils.getStyles(pane, lineColor)
        })

        const tspSolvedEventFn = (waypointsInSolution) => {
          const lineInfo = {
            line: line,
            lineWaypoints: waypoints[i].waypoint,
            waypointsInSolution: waypointsInSolution,
            map: map,
            routes: lineRoutes,
            index: i
          }

          tspState.onTSPsolved(lineInfo, Key)
        }
        line.addEventListener('tspSolvedEvent', tspSolvedEventFn)

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
    if (!this.props.map.leafletElement.getPane('markerPane')) {
      this.initMarkerPane()
    }
    if (!this.props.map.leafletElement.getPane('popupPane')) {
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

  getLeafletElementOptions (sourceKey, popup, id) {
    const tspState = TSPstate.getInstance()

    return {
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      /**
       * Returning falsy values from createMarker()
       * will result in no marker being created
       */
      createMarker: function (i, wp, n) {
        if (!tspState.getFullScreen()) {
          if (tspState.getMarkerLatLons().has(sourceKey)) {
            return false
          }
          tspState.addToMarkerLatLons(sourceKey)
        } else {
          if (tspState.getFullScreenMarkerLatLons().has(sourceKey)) {
            return false
          }
          tspState.addToFullScreenMarkerLatLons(sourceKey)
        }

        let marker = null
        if (tspState.getSelectedMarkers().has(sourceKey)) {
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

          if (!(tspState.getCitiesMainMapMarkers().hasOwnProperty(sourceKey) && !!tspState.getCitiesMainMapMarkers()[sourceKey])) {
            tspState.addToCitiesMainMapMarkers(sourceKey, marker)
          }
        }

        return marker
      }.bind(this)
    }
  }

  onMarkerClick (sourceKey, marker, id) {
    const tspState = TSPstate.getInstance()

    const isMainMapLoading = (!tspState.getFullScreen() && tspState.getIsLoading())
    if (isMainMapLoading || tspState.getIsPathSolved()) {
      return
    }

    let icon = TSPutils.getBlueIcon()
    if (tspState.getSelectedMarkers().has(sourceKey)) {
      tspState.removeFromSelectedMarkers(sourceKey)
    } else {
      tspState.addToSelectedMarkers(sourceKey)
      icon = TSPutils.getRedIcon()
    }
    marker.setIcon(icon)

    TSPutils.onMarkerClick(id)
    this.props.setNumSelectedNodes(tspState.getSelectedNodes().size)

    if (tspState.getFullScreen()) {
      const correspondingMarkerOnMainMap = tspState.getCitiesMainMapMarkers()[sourceKey]
      correspondingMarkerOnMainMap.fire('updating', icon)
    }
  }

  getRoutingCallback (callbackParams, lineParams) {
    const { map, Key, waypoints, setLoading } = this.props
    const err = callbackParams.err
    const routes = callbackParams.routes

    let line = lineParams.line
    const blueLineStyles = lineParams.blueLineStyles
    const i = lineParams.i

    const tspState = TSPstate.getInstance()
    // TODO: Investigate why in callback callsPending is always an empty set
    if (tspState.getCallsPending().has(i)) {
      tspState.removeFromCallsPending(i)
    }

    if (line) {
      map.leafletElement.removeLayer(line)
    }
    if (err) {
      // console.log(`Error in routing line ${i}: ${err.message}`)
    } else {
      let lineRoutes = null
      if (TSPutils.isCitiesGraph(Key)) {
        lineRoutes = tspState.getCitiesLineRoute()
      } else {
        lineRoutes = tspState.getVancouverLineRoute()
      }
      lineRoutes[i] = routes[0]
      if (TSPutils.isCitiesGraph(Key)) {
        tspState.setCitiesLineRoute(lineRoutes)
      } else {
        tspState.setVancouverLineRoute(lineRoutes)
      }
      line = L.Routing.line(routes[0], {
        styles: blueLineStyles
      })
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

      line = line.addTo(map.leafletElement)

      if (TSPutils.isCitiesGraph(Key)) {
        tspState.addToCitiesLines(i, line)
      } else {
        tspState.addToVancouverLines(i, line)
      }
    }
    if (!tspState.getFullScreen() && i === waypoints.length - 1) {
      setLoading(false)
      tspState.setIsLoading(false)
    }
  }
}

export default withLeaflet(Routing)
