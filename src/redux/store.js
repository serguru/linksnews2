import { createStore } from 'redux'
import { fetchAccount } from './account/accountActions'

import rootReducer from './rootReducer'

const store = createStore(
  rootReducer
)

// const select = (state) => {
//   return state.loginData.name
// }

// let current = "";
// let previous = "";
// const handleChange = () => {
//   previous = current;
//   current = select(store.getState())

//   if (previous !== current) {
//     //alert(`Current = ${current}, previous = ${previous}`);
//     fetchAccount()
//   }
// }

// store.subscribe(handleChange)



export default store
