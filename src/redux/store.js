import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { fetchAccount } from './account/accountActions'

import rootReducer from './rootReducer'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
)


function select(state) {
  return state.loginData.name
}

let current
function handleChange() {
  let previous = current
  current = select(store.getState())

  if (previous !== current) {
    store.dispatch(fetchAccount())
  }
}

store.subscribe(handleChange)



export default store
