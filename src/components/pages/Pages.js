import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import "./Pages.css";
import { LayoutSection, PresentMode } from '../../helpers/enums';
import { getSelectedPageId, setSelectedPageId } from '../../helpers/utils';
import PageEdit from './PageEdit';
import PageBrowse from './PageBrowse';
import PageHighlight from './PageHighlight';
import { updateAccount } from '../../redux/account/accountActions';
import { cloneAccount, addObject } from '../../helpers/utils';
import { v4 as uuidv4 } from 'uuid';
import Page from '../page/Page';

const Pages = () => {

  const data = useSelector(state => state.accountData)

  const [current, setCurrent] = useState();
  const [selectedPage, setSelectedPage] = useState();
  const [mode, setMode] = useState();

  useEffect(
    () => {
      if (data?.account?.pages?.length > 0) {
        const pid = getSelectedPageId();
        const page = data.account.pages.find(x => x.id === pid);
        setSelectedPage(page || data.account.pages[0]);
      }
    }, [data]
  )

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        setMode(undefined);
        setCurrent(undefined);
      }
    })
  }, [])

  const add = (page = null, before = true) => {
    const account = cloneAccount();
    const newPage = {
      id: uuidv4(),
      name: "new page",
      rows: []
    };
    addObject(account.pages, newPage, page, before);
    setMode(undefined);
    setCurrent(undefined);
    updateAccount(account, setMode, setCurrent, LayoutSection.Page, newPage.id);
  }

  const edit = (page) => {
    setMode(PresentMode.Edit);
    setCurrent(page);
  }

  const deletePage = (page) => {
    const account = cloneAccount();
    const index = account.pages.indexOf(account.pages.find(x => x.id === page.id));
    if (index < 0) {
      throw new Error("Page to remove not found");
    }
    account.pages.splice(index, 1);
    updateAccount(account);
    setMode(undefined);
    setCurrent(undefined);
  }

  const remove = (page, e) => {
    if (!e.ctrlKey) {
      return;
    }
    deletePage(page);
  }

  const save = (name) => {
    const account = cloneAccount();
    const page = account.pages.find(page => page.id === current.id);
    page.name = name;
    updateAccount(account);
    setMode(undefined);
    setCurrent(undefined);
  }

  const cancel = () => {
    if (current && current.name === "new page") {
      deletePage(current);
      return;
    }
    setMode(undefined);
    setCurrent(undefined);
  }

  const click = (e, page) => {
    if (!e.ctrlKey) {
      setMode(undefined);
      setSelectedPageId(page.id);
      setSelectedPage(page);
      return;
    }
    setMode(PresentMode.Highlight);
    setCurrent(page);
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

              <div className={`pageLink ${selectedPage === page ? "active" : ""}`} key={page.id}>


                {(!current || current !== page) &&
                  <PageBrowse page={page} click={click} />
                }
                {current && current === page && mode === PresentMode.Highlight &&
                  <PageHighlight page={page} add={add} edit={edit} remove={remove} cancel={cancel} />
                }
                {current && current === page && mode === PresentMode.Edit &&
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
        selectedPage ? <Page page={selectedPage} setMode={setMode} setCurrent={setCurrent} current={current} mode={mode} /> : <h2>Select a page</h2>
      }

    </div>
  );

  return (<div>{element}</div>)
}

export default Pages;