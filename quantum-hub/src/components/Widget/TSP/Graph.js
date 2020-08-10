// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import Keys from './Keys.js'
import GraphComponents from './GraphComponents.js'

const Graph = {
  [Keys.CITIES]: {
    edgeList: GraphComponents.getCitiesEdgeList(),
    latLong: GraphComponents.getCitiesLatLong(),
    idMapping: GraphComponents.getCitiesIdMapping(),
    nameMapping: GraphComponents.getCitiesNameMapping()
  },
  [Keys.VANCOUVER]: {
    edgeList: GraphComponents.getVanEdgeList(),
    latLong: GraphComponents.getVanLatLong(),
    idMapping: GraphComponents.getVanIdMapping(),
    nameMapping: GraphComponents.getVanNameMapping()
  },
  [Keys.FLOWERS]: {
    edgeList: GraphComponents.getFlowersEdgeList()
  }
}

export default Graph
