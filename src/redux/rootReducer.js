import { combineReducers } from 'redux'
import accountReducer from './account/accountReducer'
import loginReducer from './login/loginReducer'

const rootReducer = combineReducers({
  accountData: accountReducer,
  loginData: loginReducer,
})

export default rootReducer
