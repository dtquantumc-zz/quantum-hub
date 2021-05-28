// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'
import PropTypes from 'prop-types'
import './component_css/toggleSwitch.css'

/**
 * This is a callback function, taking the simple checked argument
 * @callback switchCallBack
 * @param {Bool} checked - Corresponds to the checkbox checked state at call
 */

/**
 * ToggleSwitch is a simple React Component
 * It is built to be useful anywhere you might want a
 * nice sliding switch. It can have text for off/on,
 * and can be disabled.
 *
 * To modify the look, please modify the css file.
 *
 * Example Use::
 *
 *  <ToggleSwitch
 *    defaultChecked={false}
 *    id='mySwitch'
 *    Text={['QPU', 'Simulation']}
 *    onChange={() => { this.do_something(with_something) }}
 *    disabled={false}
 *  />
 *
 * Properties passable through HTML call:
 * @prop {String} id - (Required) This is the component id.
 * @prop {String} Text - (Required, must have at least 2 members) Text[0] is the switch ON text, and Text[1] is the switch OFF text.
 * @prop {String} Name - This gets passed to the checkbox .name field. Useful for referencing textbox.
 * @prop {switchCallBack} onChange - This callback function gets called every time the switch gets flipped.
 * It takes a single argument, the checkbox checked state at call.
 * @prop {Bool} defaultChecked - This denotes whether the switch is on or off by default.
 * @prop {Bool} disabled - This disables the switch if enabled.
 */
class ToggleSwitch extends React.Component {
  // The constructor for the toggle switch, sets initial state
  constructor (props) {
    super(props)
    this.state = {
      checked: this.props.defaultChecked
    }
  }

  /**
   * Changes the state of the switch.
   * Used as the callback for onChange for the checkbox
   * Calls this.props.onChange()
   * @param {SyntheticEvent} e - used for e.target, which is the Element that changed to trigger this.
   * @param {Element} me - Used as a replacement for "this" in the function.
   */
  onChange (e, me) {
    me.setState({
      checked: e.target.checked
    })
    if (typeof me.props.onChange === 'function') {
      me.props.onChange(e.target.checked)
    }
  }

  /**
   * Renders the switch, should only be called by React as it does
   * automatically
   */
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

/**
 * These are the property requirements for passing to the
 * ToggleSwitch. If Text or Id are not passed, there should
 * be an error, and the component won't display.
 */
ToggleSwitch.propTypes = {
  /** This is the component id, and it is required */
  id: PropTypes.string.isRequired,
  /** Example Text: ["On", "Off"]. To make empty, just provide empty strings. */
  Text: PropTypes.arrayOf(PropTypes.string).isRequired,

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
