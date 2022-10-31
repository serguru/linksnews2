import "../../App.css";

const RowHighlight = ({ row, add, edit, remove, cancel}) => {
    return <div className="highlightedComponent">
        <div>Row highlight {row.name}</div>
        <button onClick={() => add()}>Add</button>
        <button onClick={() => edit(row)}>Edit</button>
        <button onClick={() => remove(row)}>Remove</button>
        <button onClick={() => cancel()}>Cancel</button>
    </div>
}

export default RowHighlight;