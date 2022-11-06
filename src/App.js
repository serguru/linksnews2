import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import Pages from './components/pages/Pages'
import { readLogin } from './redux/login/loginActions'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ErrorPage from './components/error-page/error-page'
import axios from 'axios'
import store from './redux/store'
import Page from './components/page/Page'
import { fetchAccount } from './redux/account/accountActions'


// axios.interceptors.request.use(
//   config => {
//     const login = store.getState().loginData;
//     if (login && login.name && login.password) {
//       const loginStr = JSON.stringify(login);
//       config.headers['login'] = loginStr;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pages />,
    errorElement: <ErrorPage />
  },
  {
    path: "/page/:path",
    element: <Page />,
  },

]);

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const select = (state) => {
      return state.loginData.name
    }

    let current = "";
    let previous = "";
    const handleChange = () => {
      previous = current;
      current = select(store.getState())

      if (previous !== current) {
        fetchAccount()
      }
    }

    store.subscribe(handleChange);
    dispatch(readLogin());
  }, [dispatch])



  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
