import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import Pages from './components/pages/Pages'
import { fetchAccount } from './redux/account/accountActions'



function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    fetchAccount();

  }, [dispatch])



  return (
      <Pages />
  )
}

export default App
