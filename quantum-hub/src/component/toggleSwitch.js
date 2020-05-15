// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 *    Author: Ari Blondal (ari.blondal@gmail.com)
 *    Author: Tanraj Saran ()
 */

import React from 'react'
import PropTypes from 'prop-types'
import './component_css/toggleSwitch.css'

class ToggleSwitch extends React.Component {
  /* ToggleSwitch is a simple React Component
   * It is built to be useful anywhere you might want a
   * nice sliding switch. It can have text for off/on,
   * and can be disabled. Example use:
    <ToggleSwitch
      defaultChecked={false}
      id='mySwitch'
      Text={['QPU', 'Simulation']}
      onChange={() => { this.do_something(with_something) }}
      disabled={false}
    />
   * To modify the look, please modify the css file
   */

  // The constructor for the toggle switch, sets initial state
  constructor (props) {
    super(props)
    this.state = {
      checked: this.props.defaultChecked
    }
  }

  // This gets called whenever the switch gets clicked, except
  // if it's disabled
  onChange (e, me) {
    me.setState({
      checked: e.target.checked
    })
    if (typeof me.props.onChange === 'function') me.props.onChange()
  }

  // Renderer
  render () {
    return (
      <div className='toggle-switch'>
        {/* This is an undercover checkbox, doing most of the work for us */}
        <input
          type='checkbox'
          name={this.props.Name}
          className='toggle-switch-checkbox'
          id={this.props.id}
          defaultChecked={this.props.defaultChecked}
          onChange={this.props.disabled ? null : (e) => { this.onChange(e, this) }}
          disabled={this.props.disabled}
        />
        {/* Doesn't display if it doesn't have an ID */}
        {this.props.id ? (
          <label className='toggle-switch-label' htmlFor={this.props.id}>
            <span
              className={
                this.props.disabled
                  ? 'toggle-switch-inner toggle-switch-disabled'
                  : 'toggle-switch-inner'
              }
              data-yes={this.props.Text[0]}
              data-no={this.props.Text[1]}
            />
            <span
              className={
                this.props.disabled
                  ? 'toggle-switch-switch toggle-switch-disabled'
                  : 'toggle-switch-switch'
              }
            />
          </label>
        ) : null}
      </div>
    )
  }
}

/* These are the property requirements for passing to the
 * ToggleSwitch. If Text or Id are not passed, there should
 * be an error, and the component won't display
 */
ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  // This is the component id, and it is required
  Text: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Example Text: ["On", "Off"]. To make empty, just provide empty strings.
  Name: PropTypes.string,
  // This is the name of the component. Useful for reference
  onChange: PropTypes.func,
  // This function will get called every time the switch is flipped
  defaultChecked: PropTypes.bool,
  // This denotes whether the switch is on or off by default
  disabled: PropTypes.bool
  // This disables the switch
}

export default ToggleSwitch
