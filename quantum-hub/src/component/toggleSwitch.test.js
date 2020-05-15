import React from 'react'
import ToggleSwitch from './toggleSwitch'
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
  act(() => {
    render(
      <ToggleSwitch
        defaultChecked={false}
        id='mySwitch'
        Text={['on', 'off']}
        disabled={false}
      />,
      container)
  })
  // Get the whole switch, make sure it hasn't fundamentally changed
  const toggle = document.getElementsByClassName('toggle-switch')
  expect(toggle).toMatchSnapshot()
})

it('changes value when clicked', () => {
  const onChange = jest.fn()
  act(() => {
    render(
      <ToggleSwitch
        defaultChecked={false}
        id='mySwitch'
        Text={['on', 'off']}
        onChange={onChange}
        disabled={false}
      />,
      container)
  })

  // get ToggleSwitch element (actually gets internal checkbox)
  const toggleS = document.querySelector('[id=mySwitch]')
  expect(toggleS.checked).toBe(false)

  // trigger click
  userEvent.click(toggleS)

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
