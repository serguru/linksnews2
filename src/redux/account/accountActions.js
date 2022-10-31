import axios from 'axios'
import {
  FETCH_ACCOUNT_REQUEST,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAILURE,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE
} from './accountTypes'
import store from '../../redux/store'

const apiUrl = 'https://localhost:7055/account';
//const apiUrl = 'https://linksnews2api.azurewebsites.net/account';

export const fetchAccount = () => {
  store.dispatch(fetchAccountRequest())
  axios
    .get(apiUrl)
    .then(response => {
      const account = response.data
      store.dispatch(fetchAccountSuccess(account))
    })
    .catch(error => {
      store.dispatch(fetchAccountFailure(error.message))
    })
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
  store.dispatch(updateAccountRequest())
  axios
  .put(apiUrl, account)
  .then(response => {
      const account = response.data
      store.dispatch(updateAccountSuccess(account))
    })
    .catch(error => {
      store.dispatch(updateAccountFailure(error.message))
    })
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

