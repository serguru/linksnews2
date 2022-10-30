import store from '../redux/store';

export const cloneAccount = () => {
    return JSON.parse(JSON.stringify(store.getState().accountData.account));
  }
