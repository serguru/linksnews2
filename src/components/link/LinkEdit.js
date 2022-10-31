import React, { useState } from 'react'

const LinkEdit = ({link, save, cancel}) => {

    const [name, setName] = useState(link.name);
    const [url, setUrl] = useState(link.url);

    return <div>
        <div>Link edit {link.name}</div>
        <div>Name</div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <div>Url</div>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}></input>
        
        <button onClick={() => save(name, url)}>Save</button>
        <button onClick={() => cancel()}>Cancel</button>
    </div>
}

export default LinkEdit;