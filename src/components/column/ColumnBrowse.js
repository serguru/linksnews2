import "./Column.css"
import "../../App.css"
import LinkBrowse from '../link/LinkBrowse'
import LinkEdit from '../link/LinkEdit'
import LinkHighlight from '../link/LinkHighlight'
import { PresentMode } from '../../helpers/enums';
import { updateAccount } from '../../redux/account/accountActions';
import { cloneAccount, addObject } from '../../helpers/utils';


const ColumnBrowse = ({ page, row, column, select, setMode, setCurrent, current, mode }) => {

    const add = (link = null, before = true) => {
        const account = cloneAccount();
        const rows =  account.pages.find(p => p.id === page.id).rows;
        const columns = rows.find(p => p.id === row.id).columns;
        const links = columns.find(x => x.id === column.id).links;
        const newLink = {
            id: "",
            url: "",
            name: "new link",
        };
        addObject(links, newLink, link,  before);
        updateAccount(account);
        setMode(undefined);
        setCurrent(undefined);
    }

    const edit = (link) => {
        setMode(PresentMode.Edit);
        setCurrent(link);
    }

    const remove = (link) => {
        const account = cloneAccount();
        const rows =  account.pages.find(p => p.id === page.id).rows;
        const columns = rows.find(p => p.id === row.id).columns;
        const links = columns.find(x => x.id === column.id).links;
        const l = links.find(x => x.id === link.id);
        const index = links.indexOf(l);
        if (index < 0) {
            throw new Error("Link to remove not found");
        }
        links.splice(index, 1);
        updateAccount(account);
        setMode(undefined);
        setCurrent(undefined);
    }

    const save = (name, url) => {
        const account = cloneAccount();
        const rows =  account.pages.find(p => p.id === page.id).rows;
        const columns = rows.find(p => p.id === row.id).columns;
        const links = columns.find(x => x.id === column.id).links;
        const l = links.find(x => x.id === current.id);
        l.name = name;
        l.url = url;
        updateAccount(account);
        setMode(undefined);
        setCurrent(undefined);
    }

    const cancel = () => {
        setMode(undefined);
        setCurrent(undefined);
    }

    const element = column.links.length > 0 ? <div className="columnContainer">
            {
                column.links.map(link => (
                    <div key={link.id}>
                        {(!current || current !== link) &&
                            <LinkBrowse link={link} select={select} />
                        }
                        {current && current === link && mode === PresentMode.Highlight &&
                            <LinkHighlight link={link} add={add} edit={edit} remove={remove} cancel={cancel} />
                        }
                        {current && current === link && mode === PresentMode.Edit &&
                            <LinkEdit link={link} save={save} cancel={cancel} />
                        }
                    </div>
                ))
            }
        </div>
     : <div className="clickableElement columnContainer" onClick={() => add()}>Add a link</div>


    return (
        <div>
            <div className="clickableElement centerText" onClick={() => select(column)} title="Click to edit">{column.name || "No name column"}</div>
            {element}
        </div>
    )


}

export default ColumnBrowse