import {
  WRITE_LOGIN,
  READ_LOGIN
} from './loginTypes'

export const readLogin = () => {
  return {
    type: READ_LOGIN,
    payload: read()
  }
}

export const writeLogin = login => {
  return {
    type: WRITE_LOGIN,
    payload: write(login)
  }
}

const read = () => {
  const login = JSON.parse(localStorage.getItem('login') || {name: "", password: ""});
  return login;
}

const write = (login) => {
  localStorage.setItem('login', JSON.stringify(login));
  return login;
}

