import { combineReducers } from 'redux'
import accountReducer from './account/accountReducer'

const rootReducer = combineReducers({
  account: accountReducer
})

export default rootReducer
