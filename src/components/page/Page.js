import React, { useState } from 'react'
import "./Page.css"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import RowBrowse from "../row/RowBrowse";
import RowEdit from "../row/RowEdit";
import RowHighlight from "../row/RowHighlight";
import { updateAccount } from '../../redux/account/accountActions';
import { PresentMode, LayoutSection } from '../../helpers/enums';
import { cloneAccount, addObject } from '../../helpers/utils';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Page = () => {

  const navigate = useNavigate();
  const data = useSelector(state => state.accountData);
  const { path } = useParams();
  const page = data.account?.pages?.find(x => x.path === path);
  const [current, setCurrent] = useState();
  const [mode, setMode] = useState();

  const select = (obj) => {
    setMode(PresentMode.Highlight);
    setCurrent(obj);
  }

  const add = (row = null, before = true) => {
    if (!page) {
      throw new Error("No page");
    }
    const account = cloneAccount();
    const rows = account.pages.find(p => p.id === page.id).rows;
    const newRow = {
      id: uuidv4(),
      name: "new row",
      columns: []
    };
    addObject(rows, newRow, row, before);
    updateAccount(account, setMode, setCurrent, LayoutSection.Row, newRow.id);
    setMode(undefined);
    setCurrent(undefined);
  }

  const edit = (row) => {
    setMode(PresentMode.Edit);
    setCurrent(row);
  }

  const remove = (row, e) => {
    if (!e.ctrlKey) {
      return;
    }
    if (!page) {
      throw new Error("No page");
    }
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
    if (!page) {
      throw new Error("No page");
    }
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

  const element = data.loading ? (
    <h2>Loading</h2>
  ) : data.error ? (
    <h2>{data.error}</h2>
  ) : page ? (

    page.rows.length > 0 ? (
      <div className="pageContainer">
        <div className="clickableElement home">
          <HomeRoundedIcon onClick={() => navigate("/")} />
        </div>
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
      <div className="clickableElement" onClick={() => add()}>Add a row</div>
    )

  ) : (
    <h2>No page</h2>
  );

  return (<div className='container'>{element}</div>);


}

export default Page