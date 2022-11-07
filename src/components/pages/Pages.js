import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./Pages.css";
import { PresentMode } from '../../helpers/enums';
import PageEdit from './PageEdit';
import PageBrowse from './PageBrowse';
import PageHighlight from './PageHighlight';
import { updateAccount } from '../../redux/account/accountActions';
import { cloneAccount, addObject } from '../../helpers/utils';

const Pages = () => {

  const data = useSelector(state => state.accountData)

  const [currentPage, setCurrentPage] = useState();
  const [mode, setMode] = useState();

  const select = (page) => {
    setMode(PresentMode.Highlight);
    setCurrentPage(page);
  }

  const add = (page = null, before = true) => {
    const account = cloneAccount();
    const newPage = {
      id: "",
      name: "new page",
      path: "newpage",
      rows: []
    };
    addObject(account.pages, newPage, page,  before);
    updateAccount(account);
    setMode(undefined);
    setCurrentPage(undefined);
  }

  const edit = (page) => {
    setMode(PresentMode.Edit);
    setCurrentPage(page);
  }

  const remove = (page) => {
    const account = cloneAccount();
    const index = account.pages.indexOf(account.pages.find(x => x.id === page.id));
    if (index < 0) {
      throw new Error("Page to remove not found");
    }
    account.pages.splice(index, 1);
    updateAccount(account);
    setMode(undefined);
    setCurrentPage(undefined);
  }

  const save = (name, path) => {
    const account = cloneAccount();
    const page = account.pages.find(page => page.id === currentPage.id);
    page.name = name;
    page.path = path;
    updateAccount(account);
    setMode(undefined);
    setCurrentPage(undefined);
  }

  const cancel = () => {
    setMode(undefined);
    setCurrentPage(undefined);
  }

  const element = data.loading ? (
    <h2>Loading</h2>
  ) : data.error ? (
    <h2>{data.error}</h2>
  ) : (
    <div className="pagesContainer">
      {
        data.account?.pages ? (
          data.account.pages.map(page => (

            <div className="pageLink" key={page.id}>
              {(!currentPage || currentPage !== page) &&
                <PageBrowse page={page} select={select} />
              }
              {currentPage && currentPage === page && mode === PresentMode.Highlight &&
                <PageHighlight page={page} add={add} edit={edit} remove={remove} cancel={cancel} />
              }
              {currentPage && currentPage === page && mode === PresentMode.Edit &&
                <PageEdit page={page} save={save} cancel={cancel} />
              }
            </div>
          ))
        ) : (
          <h2>No pages for account {data.account?.name}</h2>
        )
      }
    </div>
  );

  return (<div className='container'>{element}</div>)
}

export default Pages;