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
import { config, apiUrl } from '../../helpers/utils';
import { PresentMode } from '../../helpers/enums';
import { findLayoutSection } from '../../helpers/utils';

export const fetchAccount = () => {

  const c = config();
  if (!c) {
    store.dispatch(fetchAccountFailure("No account"));
    return;
  }

  let counter = 0;

  store.dispatch(fetchAccountRequest());
  axios
    .get(apiUrl, c)
    .then(response => {
      const account = response.data;
      if (!account) {

        // For the very first call Azure can return an empty response
        // even though an account was found in the DB
        if (counter === 0) {
          counter++;
          fetchAccount();
          return;
        }

        store.dispatch(fetchAccountFailure(`No account fetched for ${JSON.stringify(c)}`));
        return;
      }
      store.dispatch(fetchAccountSuccess(account));
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

export const updateAccount = (account, setMode = null, setCurrent = null, layoutSection = null, id = null) => {

  const c = config();
  if (!c) {
    store.dispatch(updateAccountFailure("No account"))
    return;
  }

  store.dispatch(updateAccountRequest());
  return axios
    .put(apiUrl, account, c)
    .then(response => {
      const account = response.data;
      if (setCurrent) {
        const obj = findLayoutSection(account, layoutSection, id);
        if (obj) {
          setCurrent(obj);
          setMode(PresentMode.Edit);
        }
      }
      store.dispatch(updateAccountSuccess(account));
      return account;
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

