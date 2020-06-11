// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

export const addKeyValToObject = (key, val, object) => {
  if (!object[key]) {
    object[key] = [val]
  } else {
    object[key].push(val)
  }

  return object
}
