import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
// import Console from './component/console'
// import ToggleSwitch from './component/toggleSwitch'
// import APISwitch from './component/APISwitch'
import TestComp from './component/testComp'
import * as serviceWorker from './serviceWorker'

var globalState = {
  textLines: ['l1', 'l2']
}

const globalStateContext = React.createContext(globalState)

ReactDOM.render(
  <globalStateContext.Provider value={globalState}>
    <React.StrictMode>
      <TestComp />
    </React.StrictMode>
  </globalStateContext.Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
