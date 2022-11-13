import React from 'react'
import "./Page.css"
import { useSelector } from "react-redux";
import RowBrowse from "../row/RowBrowse";
import RowEdit from "../row/RowEdit";
import RowHighlight from "../row/RowHighlight";
import { updateAccount } from '../../redux/account/accountActions';
import { PresentMode, LayoutSection } from '../../helpers/enums';
import { cloneAccount, addObject } from '../../helpers/utils';
import { v4 as uuidv4 } from 'uuid';

const Page = ({ page, setMode, setCurrent, current, mode }) => {

  const data = useSelector(state => state.accountData);

  const select = (obj) => {
    setMode(PresentMode.Highlight);
    setCurrent(obj);
  }

  const add = (row = null, before = true) => {
    const account = cloneAccount();
    const rows = account.pages.find(p => p.id === page.id).rows;
    const newRow = {
      id: uuidv4(),
      name: "new row",
      columns: []
    };
    addObject(rows, newRow, row, before);
    setMode(undefined);
    setCurrent(undefined);
    updateAccount(account, setMode, setCurrent, LayoutSection.Row, newRow.id);
  }

  const edit = (row) => {
    setMode(PresentMode.Edit);
    setCurrent(row);
  }

  const deleteRow = (row) => {
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

  const remove = (row, e) => {
    if (!e.ctrlKey) {
      return;
    }
    deleteRow(row);
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
    if (current && current.name === "new row") {
      deleteRow(current);
      return;
    }
    setMode(undefined);
    setCurrent(undefined);
  }

  const element = data.loading ? (
    <div className="messageContainer"><h2>Loading</h2></div>
  ) : data.error ? (
    <div className="messageContainer"><h2>{data.error}</h2></div>
  ) : (
    page?.rows.length > 0 ? (
      <div className="pageContainer">
        {
          page.rows.map(row => (
            <div className="pageRow" key={row.id}>
              {(!current || current !== row) &&
                <RowBrowse page={page} row={row} select={select} setMode={setMode} setCurrent={setCurrent} current={current} mode={mode} />
              }
              {current && current === row && mode === PresentMode.Highlight &&
                <RowHighlight row={row} add={add} edit={edit} remove={remove} cancel={cancel} />
              }
              {current && current === row && mode === PresentMode.Edit &&
                <RowEdit row={row} save={save} cancel={cancel} />
              }
            </div>
          ))
        }
      </div>
    ) : (
      <div className="clickableElement messageContainer" onClick={() => add()}>Add a row</div>
    )
  );

  return (<div>{element}</div>);


}

export default Page