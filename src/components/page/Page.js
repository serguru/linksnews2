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

  const [currentRow, setCurrentRow] = useState();
  const [mode, setMode] = useState();

  const select = (row) => {
    setMode(PresentMode.Highlight);
    setCurrentRow(row);
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
    setCurrentRow(undefined);
  }

  const edit = (row) => {
    setMode(PresentMode.Edit);
    setCurrentRow(row);
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
    setCurrentRow(undefined);
  }

  const save = (name) => {
    const account = cloneAccount();
    const p = account.pages.find(x => x.id === page.id);
    const r = p.rows.find(x => x.id === currentRow.id);
    r.name = name;
    updateAccount(account);
    setMode(undefined);
    setCurrentRow(undefined);
  }

  const cancel = () => {
    setMode(undefined);
    setCurrentRow(undefined);
  }

  return page ? (
    <div className="pageContainer">
      {
        page.rows.map(row => (
          <div className="pageRow" key={row.id}>
            {(!currentRow || currentRow !== row) &&
              <RowBrowse row={row} select={select}/>
            }
            {currentRow && currentRow === row && mode === PresentMode.Highlight &&
              <RowHighlight row={row} add={add} edit={edit} remove={remove} cancel={cancel}/>
            }
            {currentRow && currentRow === row && mode === PresentMode.Edit &&
              <RowEdit row={row} save={save} cancel={cancel} />
            }
          </div>
        ))
      }
    </div>
  ) : (
    <div>No page found</div>

  )
}

export default Page