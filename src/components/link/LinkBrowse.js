import "./Link.css"
import "../../App.css"

const LinkBrowse = ({ link, select }) => {

    const click = (e) => {
        if (!e.ctrlKey) {
            return;
        }
        e.preventDefault();
        select(link);
    }

    return (
            <a href={link.url} target="_blank" rel="noreferrer" onClick={(e) => click(e)} title="Ctrl+click to edit">{link.name}</a>
    )


}

export default LinkBrowse;