import "./Row.css"
import "../../App.css"
import ColumnBrowse from '../column/ColumnBrowse'
import ColumnEdit from '../column/ColumnEdit'
import ColumnHighlight from '../column/ColumnHighlight'
import { PresentMode, LayoutSection } from '../../helpers/enums';
import { updateAccount } from '../../redux/account/accountActions';
import { cloneAccount, addObject } from '../../helpers/utils';


const RowBrowse = ({ page, row, select, setMode, setCurrent, current, mode }) => {

    const add = (column = null, before = true) => {
        const account = cloneAccount();
        const rows = account.pages.find(p => p.id === page.id).rows;
        const columns = rows.find(x => x.id === row.id).columns;
        const newColumn = {
            id: "",
            name: "new column",
            links: []
        };
        addObject(columns, newColumn, column,  before);
        updateAccount(account, setMode, setCurrent, LayoutSection.Column);
        setMode(undefined);
        setCurrent(undefined);
    }

    const edit = (column) => {
        setMode(PresentMode.Edit);
        setCurrent(column);
    }

    const remove = (column) => {
        const account = cloneAccount();
        const p = account.pages.find(p => p.id === page.id);
        const r = p.rows.find(x => x.id === row.id);
        const c = r.columns.find(x => x.id === column.id);
        const index = r.columns.indexOf(c);
        if (index < 0) {
            throw new Error("Column to remove not found");
        }
        r.columns.splice(index, 1);
        updateAccount(account);
        setMode(undefined);
        setCurrent(undefined);
    }

    const save = (name) => {
        const account = cloneAccount();
        const p = account.pages.find(x => x.id === page.id);
        const r = p.rows.find(x => x.id === row.id);
        const c = r.columns.find(x => x.id === current.id);
        c.name = name;
        updateAccount(account);
        setMode(undefined);
        setCurrent(undefined);
    }

    const cancel = () => {
        setMode(undefined);
        setCurrent(undefined);
    }

    const element = row.columns.length > 0 ? <div className="rowContainer">
            {
                row.columns.map(column => (
                    <div className="rowColumn" key={column.id}>
                        {(!current || current !== column) &&
                            <ColumnBrowse page={page} row={row} column={column} select={select} setMode={setMode} setCurrent={setCurrent} current={current} mode={mode} />
                        }
                        {current && current === column && mode === PresentMode.Highlight &&
                            <ColumnHighlight column={column} add={add} edit={edit} remove={remove} cancel={cancel} />
                        }
                        {current && current === column && mode === PresentMode.Edit &&
                            <ColumnEdit column={column} save={save} cancel={cancel} />
                        }
                    </div>
                ))
            }
        </div>
     : <div className="clickableElement" onClick={() => add()}>Add a column</div>


    return (
        <div>
            <div className="clickableElement centerText" onClick={() => select(row)} title="Click to edit">{row.name || "No name row"}</div>
            {element}
        </div>
    )


}

export default RowBrowse