// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'
import PropTypes from 'prop-types'
import './component_css/APISwitch.css'
import ToggleSwitch from './toggleSwitch'

/**
 * APISwitch is a simple React Component
 * Like the toggleSwitch, but it has a textbox that's
 * active only if the switch itself is active.
 * Passing it a function for setting API key lets it
 * update a parent's API key (to '' if disabled or empty,
 * otherwise to the exact inputted string).
 *
 * To modify the look of the textbox, modify APISwitch.css
 * For the Switch, please look at ToggleSwitch
 *
 * Example Use::
 *
 *  <APISwitch
 *    id='myAPISwitch'
 *    switchText={['QPU2', 'Sim2']}
 *    setAPIKey={(key) => {
 *      console.log(key)
 *    }}
 *    defaultChecked={false}
 *  />
 *
 * Properties:
 * @prop {String} id - (Required) All Document ids should be different, this is no different.
 * @prop {Array(String)} switchText - (Required) switchText controls the text on the actual switch.
 * @prop {Func(String)} setAPIKey - (Required) Any time the API key is updated, this is called.
 * Use it to set parent values, so parent has access to this textbox's values :D
 * @prop {Bool} defaultChecked - Set if you want the switch to be on by default.
 */
class APISwitch extends React.Component {
  static propTypes = {
    /** The inner switch and textbox have ids <id>+'_switch' and <id>+'_text' respectively. */
    id: PropTypes.string.isRequired,
    /** switchText is required. Eg. ['On', 'Off'] */
    switchText: PropTypes.arrayOf(PropTypes.string).isRequired,
    setAPIKey: PropTypes.func.isRequired,
    default: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      innerText: '',
      disabled: !props.defaultChecked
    }
  }

  render () {
    return (
      <div className='api_switch'>
        {this.props.id ? (
          <span id={this.props.id}>
            <ToggleSwitch
              id={this.props.id + '_switch'}
              Text={this.props.switchText}
              Name='APISwitch'
              onChange={(checked) => {
                this.setState({
                  innerText: this.state.innerText,
                  disabled: !checked
                })
                this.props.setAPIKey(
                  checked ? this.state.innerText : ''
                )
              }}
              defaultChecked={this.props.defaultChecked}
              disabled={false}
            />
            <input
              id={this.props.id + '_text'}
              name='APIText'
              type='text'
              className='api_text_box'
              disabled={this.state.disabled}
              onChange={(e) => {
                this.setState({
                  innerText: e.target.value,
                  disabled: this.state.disabled
                })
                this.props.setAPIKey(e.target.value)
              }}
            />
          </span>
        ) : null}
      </div>
    )
  }
}

export default APISwitch
