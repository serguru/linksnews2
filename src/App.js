import React from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import Pages from './components/pages/Pages'
import Login from './components/login/Login'
import { readLogin } from './redux/login/loginActions'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ErrorPage from './components/error-page/error-page'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pages />,
    errorElement: <ErrorPage />
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
