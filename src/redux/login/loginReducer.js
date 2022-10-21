import {
  WRITE_LOGIN,
  READ_LOGIN
} from './loginTypes'

const initialState = {
  name: "",
  password: ""
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WRITE_LOGIN:
    case READ_LOGIN:
      return {
        ...state,
        name: action.payload.name,
        password: action.payload.password
      }
    default: return state
  }
}

export default reducer
