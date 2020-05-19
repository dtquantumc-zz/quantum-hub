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
 */
class APISwitch extends React.Component {
  static propTypes = {
    /** The inner switch and textbox have ids <id>+'_switch' and <id>+'_text' respectively. */
    id: PropTypes.string.isRequired,
    /** switchText is required. */
    switchText: PropTypes.arrayOf(PropTypes.string).isRequired
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
      <div>
        {this.props.id ? (
          <div>
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
          </div>
        ) : null}
      </div>
    )
  }
}

export default APISwitch
