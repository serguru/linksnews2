import React, { useState } from 'react'
import "./PagesEdit.css";
import store from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as aa from '../../redux/account/accountActions';


function PagesEdit() {
  const navigate = useNavigate();
  
  const accountOld = useSelector(state => state.accountData.account);

  if (!accountOld) {
    return <div>Loading</div>
  }

  const account = JSON.parse(JSON.stringify(accountOld));

  const update = () => {
    store.dispatch(aa.updateAccount(account));
  }

  return (
    <div>
      <h2>Editing</h2>
      <button onClick={() => update(account)}>Update</button>
      {
        account.pages.map(item => (
          <div key={item.name}>
            {item.name}
          </div>
        ))
      }
    </div>)
}

export default PagesEdit;