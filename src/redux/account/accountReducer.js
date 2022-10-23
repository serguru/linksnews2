import {
  FETCH_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAILURE,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE
} from './accountTypes'

const initialState = {
  loading: false,
  account: undefined,
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_ACCOUNT_SUCCESS:
      return {
        loading: false,
        account: action.payload,
        error: ''
      }
    case FETCH_ACCOUNT_FAILURE:
      return {
        loading: false,
        account: undefined,
        error: action.payload
      }
    case UPDATE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        loading: false,
        account: action.payload,
        error: ''
      }
    case UPDATE_ACCOUNT_FAILURE:
      return {
        loading: false,
        account: undefined,
        error: action.payload
      }
    default: return state
  }
}

export default reducer
