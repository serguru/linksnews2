import "./Link.css"

const Link = ({ link }) => {
    return <div className="linkContainer">
        <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
    </div>
}

export default Link