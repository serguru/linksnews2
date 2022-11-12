import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import "./Pages.css";
import { LayoutSection, PresentMode } from '../../helpers/enums';
import PageEdit from './PageEdit';
import PageBrowse from './PageBrowse';
import PageHighlight from './PageHighlight';
import { updateAccount } from '../../redux/account/accountActions';
import { cloneAccount, addObject } from '../../helpers/utils';
import { v4 as uuidv4 } from 'uuid';
import Page from '../page/Page';

const Pages = () => {

  const data = useSelector(state => state.accountData)

  const [currentPage, setCurrentPage] = useState();
  const [mode, setMode] = useState();

  useEffect(
    () => {
      if (data?.account?.pages?.length > 0) {
        setCurrentPage(data.account.pages[0]);
      }
    },[data]
  )

  const add = (page = null, before = true) => {
    const account = cloneAccount();
    const newPage = {
      id: uuidv4(),
      name: "new page",
      rows: []
    };
    addObject(account.pages, newPage, page, before);
    updateAccount(account, setMode, setCurrentPage, LayoutSection.Page, newPage.id);
    setMode(undefined);
    setCurrentPage(undefined);
  }

  const edit = (page) => {
    setMode(PresentMode.Edit);
    setCurrentPage(page);
  }

  const remove = (page, e) => {
    if (!e.ctrlKey) {
      return;
    }
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

  const save = (name) => {
    const account = cloneAccount();
    const page = account.pages.find(page => page.id === currentPage.id);
    page.name = name;
    setMode(undefined);
    updateAccount(account).then((acc) => {
      const page = acc.pages.find(x => x.id === currentPage?.id) 
      setCurrentPage(page);
    })
  }

  const cancel = () => {
    setMode(undefined);
  }

  const click = (e, page) => {
    if (!e.ctrlKey) {
      setMode(undefined);
      setCurrentPage(page);
      return;
    }
    setMode(PresentMode.Highlight);
    setCurrentPage(page);
  }


  const element = data.loading ? (
    <div className="messageContainer"><h2>Loading</h2></div>
  ) : data.error ? (
    <div className="messageContainer"><h2>{data.error}</h2></div>
  ) : (
    <div className="container">
      <div className="pagesContainer">
        {
          data.account?.pages ? (
            data.account.pages.map(page => (

              <div className={`pageLink ${currentPage === page ? "active" : ""}`} key={page.id}>


                {(!mode || currentPage !== page) &&
                  <PageBrowse page={page} click={click} />
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
      {
        currentPage ? <Page page={currentPage} /> : <h2>Select a page</h2>
      }

    </div>
  );

  return (<div>{element}</div>)
}

export default Pages;