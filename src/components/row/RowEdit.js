import React, { useState } from 'react'

const RowEdit = ({row, save, cancel}) => {

    const [name, setName] = useState(row.name);

    return <div>
        <div>Row edit {row.name}</div>
        <div>Name</div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        
        <button onClick={() => save(name)}>Save</button>
        <button onClick={() => cancel()}>Cancel</button>
    </div>
}

export default RowEdit;