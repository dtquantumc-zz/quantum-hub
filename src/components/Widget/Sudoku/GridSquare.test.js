import React from 'react'
import GridSquare from './GridSquare'

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

it('can be clicked for callback', () => {
  const click = jest.fn()
  act(() => {
    render(
      <GridSquare
        x={4}
        y={4}
        id='GS'
        key='lul'
        value={4}
        bolded='false'
        enabled='true'
        onClick={click}
        focused={false}
      />,
      container
    )
  })
  // Try clicking it, see if callback happens
  const G_S = document.getElementById('button44')

  // Click
  userEvent.click(G_S)
  userEvent.click(G_S)
  expect(click).toHaveBeenCalledTimes(2)
})

it('can be disabled', () => {
  const click = jest.fn()
  act(() => {
    render(
      <GridSquare
        x={4}
        y={4}
        id='GS'
        key='lul'
        value={4}
        bolded='false'
        enabled={false}
        onClick={click}
        focused={false}
      />,
      container
    )
  })
  // Try clicking it, see if callback happens
  const G_S = document.getElementById('button44')

  // Click
  userEvent.click(G_S)
  userEvent.click(G_S)
  expect(click).toHaveBeenCalledTimes(0)
})
