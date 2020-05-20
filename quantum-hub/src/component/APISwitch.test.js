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

it('can be typed in', async () => {
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
  expect(inpBox.value).toBe('')

  // trigger typing
  // Note, it types one character at a time :O
  await userEvent.type(inpBox, "Key:234")

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(toggleS.checked).toBe(true)
})

it('doesn\'t change value when disabled', () => {
  const onChange = jest.fn()
  act(() => {
    render(
      <ToggleSwitch
        defaultChecked={false}
        id='mySwitch'
        Text={['on', 'off']}
        onChange={onChange}
        disabled
      />,
      container)
  })

  // get ToggleSwitch element (actually gets internal checkbox)
  const toggleS = document.querySelector('[id=mySwitch]')
  expect(toggleS.checked).toBe(false)

  // trigger click, but now its disabled!
  userEvent.click(toggleS)

  expect(onChange).toHaveBeenCalledTimes(0)
  expect(toggleS.checked).toBe(false)
})
