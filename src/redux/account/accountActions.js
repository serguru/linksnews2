import axios from 'axios'
import {
  FETCH_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAILURE
} from './accountTypes'

export const fetchAccount = () => {
  return (dispatch) => {
    dispatch(fetchAccountRequest())
    axios
      .get('https://localhost:7055/account/default')
      .then(response => {
        const account = response.data
        dispatch(fetchAccountSuccess(account))
      })
      .catch(error => {
        dispatch(fetchAccountFailure(error.message))
      })
  }
}

export const fetchAccountRequest = () => {
  return {
    type: FETCH_ACCOUNT_REQUEST
  }
}

export const fetchAccountSuccess = users => {
  return {
    type: FETCH_ACCOUNT_SUCCESS,
    payload: users
  }
}

export const fetchAccountFailure = error => {
  return {
    type: FETCH_ACCOUNT_FAILURE,
    payload: error
  }
}
