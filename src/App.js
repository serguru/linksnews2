import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import Pages from './components/pages/Pages'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ErrorPage from './components/error-page/error-page'
import Page from './components/page/Page'
import { fetchAccount } from './redux/account/accountActions'


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

    fetchAccount();

  }, [dispatch])



  return (
      <RouterProvider router={router} />
  )
}

export default App
