import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Console from './component/console'
import ToggleSwitch from './component/toggleSwitch'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <ToggleSwitch
      defaultChecked={false}
      id='mySwitch'
      Text={['QPU', 'Simulation']}
      onChange={() => { console.log('Switched') }}
      disabled={false}
    />
    <Console textLines={['line1', 'line2']} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
