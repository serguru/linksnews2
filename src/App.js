import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store'
import Pages from './components/Pages'

function App () {
  return (
    <Provider store={store}>
      <div className='App'>
        <Pages />
      </div>
    </Provider>
  )
}

export default App
