import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import APISwitch from './component/APISwitch'
import * as serviceWorker from './serviceWorker'

var globalState = {
  textLines: ['l1', 'l2']
}

const globalStateContext = React.createContext(globalState)

ReactDOM.render(
  <globalStateContext.Provider value={globalState}>
    <React.StrictMode>
      <APISwitch
        id='myAPISwitch'
        switchText={['QPU2', 'Sim2']}
        setAPIKey={(key) => {
          console.log(key)
        }}
        defaultChecked={false}
      />
      <App isSudokuSolver />
    </React.StrictMode>
  </globalStateContext.Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
