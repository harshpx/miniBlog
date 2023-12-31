import React from 'react'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

function Root() {
  return (
    <Provider store={store}>
        <App/>
    </Provider>
  )
}

export default Root