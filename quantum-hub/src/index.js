import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <GenericApp />
  </React.StrictMode>,
  document.getElementById('root')
)

/**
 * Routes to different components based on window pathname
 */
function GenericApp () {
  const route = window.location.pathname
  if (route.startsWith('/app/')) {
    return (<App widget={route.substr(5, route.length)} />)
  } else {
    return (<App />)
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
