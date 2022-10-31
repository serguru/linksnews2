import { Link } from "react-router-dom";

const PageBrowse = ({ page, select }) => {

    const click = (e) => {
        if (!e.ctrlKey) {
            return;
        }
        e.preventDefault();
        select(page);
    }

    return <div>
        <Link to={"page/" + page.path} onClick={(e) => click(e)} title="Ctrl+click to edit">{page.name}</Link>
    </div>
}

export default PageBrowse;