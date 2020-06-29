// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import XMLHttpRequest from 'xhr2'

/**
 * XHRCallbackFunction
 * @function XHRCallbackFunction
 * @param {XMLHTTPRequest} xhr - It will be passed the entire request that
 * it is supposed to be able to handle. This is to offer maximum flexibility
 * of the LongRequest interface.
 */

/**
 * This fields requests for long processes. It automatically handles the
 * resending of requests until the process is done, and calls the hooks
 * provided by the caller when needed. It is a fancy and useful interface
 * for interacting with the background processing Redis server.
 * @param {JSON} params - This is the params JSON object to be sent to the
 * server describin the process request. PLEASE DO NOT stringify this before
 * passing it or it WILL get restringified, and that causes server-side errors.
 * @param {XHRCallbackFunction} onQueue - Callback for initial queue placement.
 * Returns jobID.
 * @param {XHRCallbackFunction} onUpdate - Callback for any updates.
 * xhr.meta should be a dictionary that contains any meta information usable for
 * the update.
 * @param {XHRCallbackFunction} onComplete - Callback for when the worker returns
 * successful results.
 * @param {XHRCallbackFunction} onFail - Callback for when the worker or a request fails.
 * @param {Function} outputFunc - Anything that can accept a string. This is meant
 * to output errors as well as standard messages.
 */
function makeLongRequest (params, onQueue, onUpdate, onComplete, onFail, outputFunc) {
  var xhr = new XMLHttpRequest()
  const url = '/make_worker'
  const async = true
  xhr.open('POST', url, async)
  xhr.responseType = 'json'

  xhr.onload = () => {
    onLoad(xhr, onQueue, onUpdate, onComplete, onFail, outputFunc)
  }
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(params))
}

/**
 * This asks the server for an update on the job as stored in job. The function
 * callbacks are necessary because this loops back into onLoad.
 * @param {XHRCallbackFunction} onQueue - Callback for initial queue placement.
 * Returns jobID.
 * @param {XHRCallbackFunction} onUpdate - Callback for any updates.
 * xhr.meta should be a dictionary that contains any meta information usable for
 * the update.
 * @param {XHRCallbackFunction} onComplete - Callback for when the worker returns
 * successful results.
 * @param {XHRCallbackFunction} onFail - Callback for when the worker or a request fails.
 * @param {Function} outputFunc - Anything that can accept a string. This is meant
 * to output errors as well as standard messages.
 * @param {String} job - The job ID, to be given to the server to complete the request
 * for an update.
 */
function updateRequest (onQueue, onUpdate, onComplete, onFail, outputFunc, job) {
  var xhr = new XMLHttpRequest()
  const url = '/check_worker'
  const params = {
    jobID: job
  }
  const async = true
  xhr.open('POST', url, async)

  xhr.responseType = 'json'

  xhr.onload = () => {
    onLoad(xhr, onQueue, onUpdate, onComplete, onFail, outputFunc)
  }
  xhr.setRequestHeader('Content-type', 'application/json')
  console.log(params)
  xhr.send(JSON.stringify(params))
}

/**
 * This handles any responses from the server relating to one of either makeLongRequest
 * or updateRequest's calls.
 *
 * - If the jobStatus of the response is 'finished', onComplete is called.
 *
 * - If jobStatus is 'queued' or 'started', onUpdate is called, and another
 * updateRequest is scheduled.
 *
 * - If jobStatus is 'enqueued', onQueue is called and an updateRequest is scheduled.
 *
 * - If jobStatus is anything else, a failure somewhere along the line is suspected,
 * and error messages are outputted. onFail is also called, in case the caller needs
 * to know to reset and try again.
 *
 * - If the XML request status is not 200, a failure is detected, and onFail is called.
 *
 * @param {XMLHTTPRequest} xhr - The latest XML Http Request as stored in an Object.
 * Used to retrieve all the information about the loaded request.
 * @param {XHRCallbackFunction} onQueue - Callback for initial queue placement.
 * Returns jobID.
 * @param {XHRCallbackFunction} onUpdate - Callback for any updates.
 * xhr.meta should be a dictionary that contains any meta information usable for
 * the update.
 * @param {XHRCallbackFunction} onComplete - Callback for when the worker returns
 * successful results.
 * @param {XHRCallbackFunction} onFail - Callback for when the worker or a request fails.
 * @param {Function} outputFunc - Anything that can accept a string. This is meant
 * to output errors as well as standard messages.
 * @param {String} job - The job ID, to be given to the server to complete the request
 * for an update.
 */
function onLoad (xhr, onQueue, onUpdate, onComplete, onFail, outputFunc, job = null) {
  if (xhr.status === 200) {
    // queued, started, deferred, finished, and failed
    if (xhr.response.jobStatus === 'finished') {
      onComplete(xhr)
    } else if (xhr.response.jobStatus === 'queued' || xhr.response.jobStatus === 'started') {
      // Job is queued or running
      if (job && job !== xhr.response.jobID) {
        outputFunc('Error, job ID of update didn\'t match with existing one.')
        onFail(xhr)
        return
      }
      const newjob = xhr.response.jobID
      setTimeout(() => {
        updateRequest(onQueue, onUpdate, onComplete, onFail, outputFunc, newjob)
      }, 1000)
      onUpdate(xhr)
    } else if (xhr.response.jobStatus === 'enqueued') {
      // Job just got queued
      const newjob = xhr.response.jobID
      setTimeout(() => {
        updateRequest(onQueue, onUpdate, onComplete, onFail, outputFunc, newjob)
      }, 1000)
      onQueue(xhr)
    } else {
      outputFunc('Job failed')
      onFail(xhr)
    }
  } else if (xhr.status === 400) {
    // outputFunc(xhr.response.error)
    onFail(xhr)
  } else {
    outputFunc(xhr.status + ' ' + xhr.statusText)
    outputFunc('Your request may have timed out.')
    outputFunc('Please save any logs and report them.')
    onFail(xhr)
  }
}

export default makeLongRequest
