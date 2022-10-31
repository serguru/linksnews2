

const ColumnHighlight = ({ column, add, edit, remove, cancel}) => {
    return <div>
        <div>Column highlight {column.name}</div>
        <button onClick={() => add()}>Add</button>
        <button onClick={() => edit(column)}>Edit</button>
        <button onClick={() => remove(column)}>Remove</button>
        <button onClick={() => cancel()}>Cancel</button>
    </div>
}

export default ColumnHighlight;