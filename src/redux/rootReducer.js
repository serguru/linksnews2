import { combineReducers } from 'redux'
import accountReducer from './account/accountReducer'

const rootReducer = combineReducers({
  accountData: accountReducer
})

export default rootReducer
