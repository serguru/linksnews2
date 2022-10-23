import axios from 'axios'
import {
  FETCH_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAILURE,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE
} from './accountTypes'

export const fetchAccount = () => {
  return (dispatch) => {
    dispatch(fetchAccountRequest())
    axios
      .get('https://localhost:7055/account')
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

export const updateAccount = (account) => {
  return (dispatch) => {
    dispatch(updateAccountRequest())
    axios
      .put('https://localhost:7055/account', account)
      .then(response => {
        const account = response.data
        dispatch(updateAccountSuccess(account))
      })
      .catch(error => {
        dispatch(updateAccountFailure(error.message))
      })
  }
}

export const updateAccountRequest = () => {
  return {
    type: UPDATE_ACCOUNT_REQUEST
  }
}

export const updateAccountSuccess = account => {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    payload: account
  }
}

export const updateAccountFailure = error => {
  return {
    type: UPDATE_ACCOUNT_FAILURE,
    payload: error
  }
}

