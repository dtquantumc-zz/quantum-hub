// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */
export default class Utils {
  /**
    * @param {string} key whose value will be updated
    * @param {any} val value to add
    * @param {object} object whose key-val pair will be updated
    * @returns {object} updated object
    */
  static addKeyValToObject (key, val, object) {
    if (!object[key]) {
      object[key] = [val]
    } else {
      object[key].push(val)
    }

    return object
  }
}