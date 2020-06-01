import React from 'react'
import NurseSquare from './NurseSquare'

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
  act(() => {
    render(
      <NurseSquare
        row={4}
        col={4}
        key={[4, 4]}
        content='X'
        nC={6}
        nR={6}
      />,
      container
    )
  })
  // SnapSHOT
  const NS = document.getElementById('square44')
  expect(NS).toMatchSnapshot()
})
