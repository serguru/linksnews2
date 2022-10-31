

const LinkHighlight = ({ link, add, edit, remove, cancel}) => {
    return <div>
        <div>Link highlight {link.name}</div>
        <button onClick={() => add()}>Add</button>
        <button onClick={() => edit(link)}>Edit</button>
        <button onClick={() => remove(link)}>Remove</button>
        <button onClick={() => cancel()}>Cancel</button>
    </div>
}

export default LinkHighlight;