import React from 'react'
import Console from './console'
// import renderer from 'react-test-renderer'
// import { cleanup, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { render, unmountComponentAtNode } from 'react-dom'
import '@testing-library/jest-dom/extend-expect'

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
  var lines = ['line1, line2']

  // Create a jest fn to simulate scrolling
  const scrollFunc = jest.fn()
  window.HTMLElement.prototype.scrollIntoView = scrollFunc

  act(() => {
    render(
      <Console textLines={lines} />,
      container)
  })

  // Get the console, make sure it hasn't fundamentally changed
  const cons = document.getElementById('console')
  expect(cons).toMatchSnapshot()

  // Add a line, make sure this snapshot also holds
  lines.concat('line3')
  expect(cons).toMatchSnapshot()
})

it('scrolls down with every added line', () => {
  var lines = ['line1, line2']

  // Create a jest fn to simulate scrolling
  const scrollFunc = jest.fn()
  window.HTMLElement.prototype.scrollIntoView = scrollFunc

  act(() => {
    render(
      <Console textLines={lines} />,
      container)
  })

  // Add an element, test that scroll was triggered
  lines.concat('line3')
  expect(scrollFunc).toHaveBeenCalledTimes(1)
})
