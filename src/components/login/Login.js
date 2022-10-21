import React from 'react'
import { useSelector } from 'react-redux'

function Login() {

  const login = useSelector(state => {
    return state.loginData
  }
  );

  return (
    <div>
      <h2>Login</h2>
      <h2>Name: {login.name}</h2>
      <h2>Password: {login.password}</h2>
    </div>)
}

export default Login
