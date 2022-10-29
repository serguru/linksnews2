import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./Pages.css";
import { PresentMode } from '../../helpers/enums';
import PageEdit from './PageEdit';
import PageBrowse from './PageBrowse';
import PageHighlight from './PageHighlight';
import store from '../../redux/store'
import { updateAccount } from '../../redux/account/accountActions';

const Pages = () => {

  const data = useSelector(state => state.accountData)
  const loginData = useSelector(state => state.loginData)

  const [currentPage, setCurrentPage] = useState();
  const [mode, setMode] = useState();

  const mouseLeave = () => {
    if (mode !== PresentMode.Highlight) {
      return;
    }
    setMode(undefined);
    setCurrentPage(undefined);
  }

  const mouseEnter = (page) => {
    if (currentPage) {
      return;
    }
    setMode(PresentMode.Highlight);
    setCurrentPage(page);
  }

  const cloneAccount = () => {
    return JSON.parse(JSON.stringify(store.getState().accountData.account));
  }

  const add = () => {
    let account = cloneAccount();
    account.pages.push({
      id: "",
      name: "new page",
      path: "newpage",
      rows: []
    })
    updateAccount(account);
    setMode(undefined);
    setCurrentPage(undefined);
  }

  const edit = (page) => {
    setMode(PresentMode.Edit);
    setCurrentPage(page);
  }

  const remove = (page) => {
    let account = cloneAccount();
    const index = account.pages.indexOf(page);
    account.pages.splice(index, 1);
    updateAccount(account);
    setMode(undefined);
    setCurrentPage(undefined);
  }

  const applyPage = (account, name, path) => {
    const page = account.pages.find(page => page.id === currentPage.id);
    page.name = name;
    page.path = path;
  }

  const save = (name, path) => {
    let account = cloneAccount();
    applyPage(account, name, path);
    updateAccount(account);
    setMode(undefined);
    setCurrentPage(undefined);
  }

  const cancel = () => {
    setMode(undefined);
    setCurrentPage(undefined);
  }


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

            <div className="pageLink" key={page.id}

              onMouseEnter={(e) => {
                if (!e.ctrlKey) {
                  return;
                }
                mouseEnter(page)
              }
              }
              onMouseLeave={() => mouseLeave()}
            >
              {(!currentPage || currentPage !== page) &&
                <PageBrowse page={page} />
              }
              {currentPage && currentPage === page && mode === PresentMode.Highlight &&
                <PageHighlight page={page} add={add} edit={edit} remove={remove}/>
              }
              {currentPage && currentPage === page && mode === PresentMode.Edit &&
                <PageEdit page={page} save={save} cancel={cancel}/>
              }
            </div>
          ))

        }
      </div>
    </div>
  )
}

export default Pages;