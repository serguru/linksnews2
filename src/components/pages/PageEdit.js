import React, { useState } from 'react'

const PageEdit = ({page, save, cancel}) => {

    const [name, setName] = useState(page.name);
    const [path, setPath] = useState(page.path);

    return <div>
        <div>Page edit {page.name}</div>
        <div>Name</div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <div>Path</div>
        <input type="text" value={path} onChange={(e) => setPath(e.target.value)}></input>
        
        <button onClick={() => save(name, path)}>Save</button>
        <button onClick={() => cancel()}>Cancel</button>
    </div>
}

export default PageEdit;