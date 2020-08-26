// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import 'leaflet-routing-machine'
// import {IRoute, IRouteSummary} from 'leaflet-routing-machine'
// import { MapLayer, withLeaflet } from 'react-leaflet'
import L from 'leaflet'
import XMLHttpRequest from 'xhr2'

class PersistentGraph {
  static loadGraph () {
    if (this.isLoaded || this.isLoading) return

    this.router = null
    this.requestDictionary = null
    this.isLoaded = false
    this.isLoading = true

    this.requests = []
    this.handled = false

    var xhr = new XMLHttpRequest()
    const url = '/get_persistent_graph'
    const async = true
    xhr.open('GET', url, async)
    xhr.responseType = 'json'
    xhr.onload = () => {
      if (xhr.response) {
        // setIP(xhr.response.ip)
        this.requestDictionary = xhr.response
        this.isLoaded = true
        this.isLoading = false
        // console.log(this.requestDictionary)
        this.handleRoutes()
      }
    }
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send()
  }

  static requestRoute ([waypointSource, waypointDest], myCallback) {
    if (!this.isLoaded && !this.isLoading) {
      console.log('Please load the persistent graph before using')
      return
    } else if (this.isLoading) {
      this.requests.push([[waypointSource, waypointDest], myCallback])
      return
    }

    // console.log([waypointSource, waypointDest], my_callback)

    const res = this.requestDictionary[JSON.stringify([waypointSource, waypointDest])]

    // console.log(res)

    if (res) {
      // console.log(Object.keys(this.requestDictionary))
      myCallback(null, this.getRoute(res))
    } else {
      if (this.router === null) {
        this.router = new L.Routing.osrmv1({}) // eslint-disable-line new-cap
      }
      this.router.route([waypointSource, waypointDest], (err, routes) => {
        if (err) {
          console.log('Error in routing for new persistency route')
          console.log(err)
          myCallback(err, routes)
        } else {
          // routes.instructions = []

          this.requestDictionary[JSON.stringify([waypointSource, waypointDest])] =
            this.simplifyRoute(routes[0])
          console.log(JSON.stringify(this.requestDictionary, null, 1))
          console.log('Written to Persistent_Routes')
          myCallback(null, this.getRoute(
            this.requestDictionary[JSON.stringify([waypointSource, waypointDest])]
          ))
          // my_callback(null, routes)
        }
      })
    }
  }

  static handleRoutes () {
    // console.log(this.requests)
    if (this.handled) return
    for (var e of this.requests) {
      this.requestRoute(e[0], e[1])
    }
    // this.handled = true
  }

  static getRoute (route) {
    var rt = {}
    rt.name = route.name
    rt.summary = route.summary
    rt.coordinates = route.coordinates.map(([lat, lng]) => { return new L.LatLng(lat, lng) })
    rt.waypoints = [rt.coordinates[0], rt.coordinates[rt.coordinates.length - 1]]
    rt.inputWaypoints = route.inputWaypoints.map((e) => {
      return {
        options: e.options,
        latLng: new L.LatLng(e.latLng.lat, e.latLng.lng)
      }
    })
    rt.instructions = []
    return [rt, null]
  }

  static simplifyRoute (route) {
    // console.log(route)
    // route = route[0]
    var rt = {}
    rt.name = route.name
    rt.summary = route.summary
    rt.inputWaypoints = route.inputWaypoints
    rt.coordinates = []
    var lastLat = route.coordinates[0].lat
    var lastLng = route.coordinates[0].lng
    rt.coordinates.push([lastLat, lastLng])
    for (var i = 1; i < route.coordinates.length; ++i) {
      if (Math.abs(lastLat - route.coordinates[i].lat) > 0.01 ||
          Math.abs(lastLng - route.coordinates[i].lng) > 0.01 ||
          route.coordinates.length < 1000) {
        lastLat = route.coordinates[i].lat
        lastLng = route.coordinates[i].lng
        rt.coordinates.push([lastLat, lastLng])
      }
    }
    if (rt.coordinates[rt.coordinates.length - 1] !== route.coordinates[route.coordinates.length - 1]) {
      lastLat = route.coordinates[route.coordinates.length - 1].lat
      lastLng = route.coordinates[route.coordinates.length - 1].lng
      rt.coordinates.push([lastLat, lastLng])
    }
    return rt
  }
}

export default PersistentGraph
