// SPDX-License-Identifier: MIT
/*
 * (C) Copyright 2020
 * Diversifying Talent in Quantum Computing, Geering Up, UBC
 */

import React from 'react'
import makeLongRequest from '../LongRequest'

/**
 * Widget is meant to be an example base class.
 * This should be able to be used to test other
 * functionalities.
 *
 * Any more advanced widget implemented should
 * have the same prop interface (or a larger one).
 * This is so that all the widgets are interchangeable
 * fairly easily. If different interfaces are needed,
 * then a dictionary for default declaration types can
 * be made. For now, that is unneeded.
 *
 * Originally, this Widget class was going to supply the description,
 * but upon further consideration, it is best that descriptions
 * be supplied in a JSON so rerendering this widget doesn't constantly
 * try to update upstream states and cause a whole lot of unnecessary
 * computation.
 *
 * Example Use::
 *
 *  const [APIKey, setAPIKey] = useState('')
 *  const [textLines, setTextLines] = useState([])
 *  return (
 *    <Widget
 *      id='myWidget'
 *      getAPIKey={() => APIKey}
 *      outputToConsole={(line) => {
 *        setTextLines(textLines.concat(line))
 *      }}
 *    />
 *  )
 *
 * Properties:
 * @prop {string} id - (Required) This will get extended to
 * serve as the id base string for all underlying components.
 * @prop {func()} getAPIKey - (Required) This needs
 * to be a function that can be called to return the current API
 * key.
 * NOTE: If it returns '', this is equivalent to choosing the
 * simulator.
 * @prop {func(string)} outputToConsole - (Required) This function
 * should take a single string (a line of text), and concatenate
 * it to the current console output string array. If the Console
 * is not being used, this can do anything you want with that
 * string, but you should probably output it in some way.
 */
class Widget extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 'idle'
    }
  }

  /**
   * An example of a call to solve the widget puzzle
   */
  async callSolver () {
    if (this.state.status === 'waiting...') return

    const consoleMsg = 'Making a call using LongRequest'
    this.props.outputToConsole(consoleMsg)

    /* Example async call */
    // this.pseudoHash(APIKey).then((result) => { this.resolveSolve(result) })

    const params = {
      time: 5,
      typeOfProblem: 'nurseScheduling',
      n_nurses: 5,
      n_days: 4
    }

    /** How to make a Long Request:
     * Note that each of the four functions should take an XML request
     * as a parameter.
     */
    makeLongRequest(
      params,
      (xhr) => { this.props.outputToConsole('Queued!') },
      (xhr) => { this.props.outputToConsole(xhr.response.jobStatus) },
      (xhr) => {
        this.props.outputToConsole('Finished w result: ' + xhr.response.n)
        this.props.outputToConsole(JSON.stringify(xhr.response))
        this.setState({
          status: 'Solved!'
        })
      },
      (xhr) => {
        this.props.outputToConsole('Something went wrong')
        console.log(xhr)
        this.props.outputToConsole(JSON.stringify(xhr))
        this.setState({
          status: 'oops!'
        })
      },
      this.props.outputToConsole
    )

    /* This could be a fetch() call, or a classical solver, or anything in between */
    this.setState({
      status: 'waiting...'
    })
  }

  /** Simply simulate an async call that may take a while to resolve
   * WARNING: This is not a good hash function
   */
  async pseudoHash (toHash) {
    var hash = 0
    for (var i = 0; i < toHash.length; ++i) {
      hash += ((toHash.charCodeAt(i) * (i + 1)) % 127) * Math.pow(128, i)
    }
    var hashString = ''
    while (hash > 0) {
      var newChar
      if (hash % 36 < 10) newChar = String.fromCharCode(hash % 36 + '0'.charCodeAt(0))
      else newChar = String.fromCharCode(hash % 36 + 'a'.charCodeAt(0) - 10)
      hashString += newChar
      hash = Math.floor(hash / 36)
    }
    await new Promise(resolve => setTimeout(resolve, 1000))
    return hashString
  }

  /**
   * An example of what one might want to do with a result
   * Also an example of interacting with console
   * @param {String} result - The return value or result of the async solver call
   */
  async resolveSolve (result) {
    this.setState({
      status: 'Solved!'
    })
    this.props.outputToConsole('Problem was solved! Ans: ' + result)
  }

  /**
   * A simple renderer so all the utility of our example widget
   * is visible.
   */
  render () {
    return (
      <div>
        <button
          type='button'
          onClick={() => {
            this.props.outputToConsole('sorry, I\'m a blank app')
          }}
          id={this.props.id + '_button'}
        >
          Click me to solve!
        </button>
        <p>
          {this.state.status}
        </p>
      </div>
    )
  }
}

export default Widget
