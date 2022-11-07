import store from '../redux/store';

export const cloneAccount = () => {
    return JSON.parse(JSON.stringify(store.getState().accountData.account));
  }

//export const apiUrl = 'https://localhost:7055/account';
export const apiUrl = 'https://linksnews2api.azurewebsites.net/account';

export const getLoginStr = () => {
  return localStorage.getItem('login');
}

export const getLogin = () => {
  const l = getLoginStr();
  if (!l) {
    return undefined
  }
  return JSON.parse(l);
}

export const config = () => {
  const l = getLoginStr();

  if (!l) {
    return undefined;
  }

  const result = {
    'headers': {
      'login': l
    }
  }

  return result; 
}
