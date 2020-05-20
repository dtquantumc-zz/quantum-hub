import React from 'react'
import APISwitch from './APISwitch'
// import renderer from 'react-test-renderer'
// import { cleanup, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { render, unmountComponentAtNode } from 'react-dom'
import userEvent from '@testing-library/user-event'

let container = null
beforeEach(() => {
  // Setup DOM element as render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('looks the same as last time (snapshot)', () => {
  const setAPI = jest.fn((key) => { return key })
  act(() => {
    render(
      <APISwitch
        defaultChecked={false}
        id='mySwitch'
        switchText={['on', 'off']}
        setAPIKey={setAPI}
      />,
      container)
  })
  // Get whole thing, make sure it hasn't fundamentally changed
  const apiS = document.getElementById('mySwitch')
  expect(apiS).toMatchSnapshot()
})

it('can be typed in and disabled', async () => {
  const setAPI = jest.fn((key) => { return key })
  act(() => {
    render(
      <APISwitch
        defaultChecked
        id='mySwitch'
        switchText={['on', 'off']}
        setAPIKey={setAPI}
      />,
      container)
  })

  // get input element within APISwitch
  const inpBox = document.getElementById('mySwitch_text')
  // const apiS = document.getElementById('mySwitch')
  const togSwitch = document.getElementById('mySwitch_switch')
  expect(inpBox.value).toBe('')

  // trigger typing
  // Note, it types one character at a time :O
  const testStr = 'Key:234'
  await userEvent.type(inpBox, testStr)

  // Check the right num of calls
  expect(setAPI).toHaveBeenCalledTimes(testStr.length)

  // Check each call input and output is correct
  for (let i = 0; i < testStr.length; ++i) {
    const testSlice = testStr.slice(0, i + 1)
    expect(setAPI.mock.calls[i][0]).toBe(testSlice)
    expect(setAPI.mock.results[i].value).toBe(testSlice)
  }

  // Click the switch to disable then enable the textbox
  userEvent.click(togSwitch)
  userEvent.click(togSwitch)

  // Check that the number of calls has increased by two
  expect(setAPI).toHaveBeenCalledTimes(testStr.length + 2)

  // Check correctness of calls
  expect(setAPI.mock.calls[testStr.length][0]).toBe('')
  expect(setAPI.mock.results[testStr.length].value).toBe('')

  expect(setAPI.mock.calls[testStr.length + 1][0]).toBe(testStr)
  expect(setAPI.mock.results[testStr.length + 1].value).toBe(testStr)
})

it('doesn\'t get typed in when switched off', async () => {
  const setAPI = jest.fn((key) => { return key })
  act(() => {
    render(
      <APISwitch
        id='mySwitch'
        switchText={['on', 'off']}
        setAPIKey={setAPI}
      />,
      container)
  })

  const inpBox = document.getElementById('mySwitch_text')

  // get ToggleSwitch element (actually gets internal checkbox)
  const toggleS = document.getElementById('mySwitch_switch')
  expect(toggleS.checked).toBe(false)

  // trigger type, but now its disabled!
  const testStr = 'Key:234'
  await userEvent.type(inpBox, testStr)

  // Check the right num of calls
  expect(setAPI).toHaveBeenCalledTimes(0)

  // Check that there is no text typed
  expect(inpBox.value).toBe('')
})
