import React from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import Pages from './components/pages/Pages'
import Login from './components/login/Login'
import { readLogin } from './redux/login/loginActions'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ErrorPage from './components/error-page/error-page'
import axios from 'axios'
import store from './redux/store'
import Page from './components/page/Page' 

axios.interceptors.request.use(
  config => {
    const login = store.getState().loginData;
    if (login && login.name && login.password) {
      const loginStr = JSON.stringify(login);
      config.headers['login'] = loginStr;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pages />,
    errorElement: <ErrorPage />
  },
  {
    path: "/page/:name",
    element: <Page />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {

  const dispatch = useDispatch();

  dispatch(readLogin())
 
  return (
    <div className='App'>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
