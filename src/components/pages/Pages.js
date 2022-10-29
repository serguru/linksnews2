import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./Pages.css";
import { PresentMode } from '../../helpers/enums';
import PageEdit from './PageEdit';
import PageBrowse from './PageBrowse';
import PageHighlight from './PageHighlight';

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

  const add = () => {
    // TODO
    setMode(undefined);
    setCurrentPage(undefined);
  }

  const edit = (page) => {
    setMode(PresentMode.Edit);
    setCurrentPage(page);
  }

  const remove = () => {
    // TODO
    setMode(undefined);
    setCurrentPage(undefined);
  }

  const save = (name, path) => {
    // TODO
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