import React, { useState } from 'react'
import "./Page.css"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import RowBrowse from "../row/RowBrowse";
import RowEdit from "../row/RowEdit";
import RowHighlight from "../row/RowHighlight";
import { updateAccount } from '../../redux/account/accountActions';
import { PresentMode } from '../../helpers/enums';
import { cloneAccount } from '../../helpers/utils';

const Page = () => {
  const { path } = useParams();

  const page = useSelector(state => {
    const pages = state.accountData.account?.pages;
    const page = pages?.find(x => x.path === path);
    return page;
  })

  const [current, setCurrent] = useState();
  const [mode, setMode] = useState();

  const select = (obj) => {
    setMode(PresentMode.Highlight);
    setCurrent(obj);
  }

  const add = () => {
    const account = cloneAccount();
    const rows = account.pages.find(p => p.id === page.id).rows;
    rows.push({
      id: "",
      name: "new row",
      columns: []
    })
    updateAccount(account);
    setMode(undefined);
    setCurrent(undefined);
  }

  const edit = (row) => {
    setMode(PresentMode.Edit);
    setCurrent(row);
  }

  const remove = (row) => {
    const account = cloneAccount();
    const p = account.pages.find(p => p.id === page.id);
    const r = p.rows.find(x => x.id === row.id);
    const index = p.rows.indexOf(r);
    if (index < 0) {
      throw new Error("Row to remove not found");
    }
    p.rows.splice(index, 1);
    updateAccount(account);
    setMode(undefined);
    setCurrent(undefined);
  }

  const save = (name) => {
    const account = cloneAccount();
    const p = account.pages.find(x => x.id === page.id);
    const r = p.rows.find(x => x.id === current.id);
    r.name = name;
    updateAccount(account);
    setMode(undefined);
    setCurrent(undefined);
  }

  const cancel = () => {
    setMode(undefined);
    setCurrent(undefined);
  }

  return page.rows.length > 0 ? (
    <div className="pageContainer">
      {
        page.rows.map(row => (
          <div className="pageRow" key={row.id}>
            {(!current || current !== row) &&
              <RowBrowse page={page} row={row} select={select} setMode={setMode} setCurrent={setCurrent} current={current} mode={mode}/>
            }
            {current && current === row && mode === PresentMode.Highlight &&
              <RowHighlight row={row} add={add} edit={edit} remove={remove} cancel={cancel}/>
            }
            {current && current === row && mode === PresentMode.Edit &&
              <RowEdit row={row} save={save} cancel={cancel} />
            }
          </div>
        ))
      }
    </div>
  ) : (
    <div className="clickableElement" onClick={() => add()}>Add a row</div>

  )
}

export default Page