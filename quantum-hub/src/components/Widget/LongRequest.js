// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import XMLHttpRequest from 'xhr2'

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
