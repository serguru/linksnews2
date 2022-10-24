import { createStore } from 'redux'
import { fetchAccount } from './account/accountActions'

import rootReducer from './rootReducer'

const store = createStore(
  rootReducer
)

function select(state) {
  return state.loginData.name
}

let current
function handleChange() {
  let previous = current
  current = select(store.getState())

  if (previous !== current) {
//    store.dispatch(fetchAccount())
    fetchAccount()
  }
}

store.subscribe(handleChange)



export default store
