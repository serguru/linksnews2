import React, { useState } from 'react'

const ColumnEdit = ({column, save, cancel}) => {

    const [name, setName] = useState(column.name);

    return <div>
        <div>Column edit {column.name}</div>
        <div>Name</div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        
        <button onClick={() => save(name)}>Save</button>
        <button onClick={() => cancel()}>Cancel</button>
    </div>
}

export default ColumnEdit;