import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import "./Pages.css";

function Pages() {

  const data = useSelector(state => state.accountData)
  const loginData = useSelector(state => state.loginData)

  return data.loading ? (
    <h2>Loading</h2>
  ) : data.error ? (
    <h2>{data.error}</h2>
  ) : (
    <div>
      <h2>{loginData.name || 'Not logged in'}</h2>
      <div className="pagesContainer">
        {
          data.account?.pages.map(page => (
            <div className="pageLink" key={page.id}>
              <Link to={"page/" + page.name}>{page.name}</Link>
            </div>
          ))

        }
      </div>
    </div>
  )
}

export default Pages;