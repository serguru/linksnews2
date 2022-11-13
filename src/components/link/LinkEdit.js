import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import "./Link.css";
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';

const LinkEdit = ({ link, save, cancel }) => {

    const [name, setName] = useState(link.name);
    const [url, setUrl] = useState(link.url);
    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            save(name, url)
        }
    }

    return <div className="highlightContainer" onKeyDown={handleKeyDown}>
        <TextField id="name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} autoFocus
            onFocus={event => {
                event.target.select();
            }}
        />
        <div className="tf">
            <TextField id="url" label="Url" variant="outlined" value={url} onChange={(e) => setUrl(e.target.value)} onFocus={event => {
                event.target.select();
            }} />
        </div>


        <div className='iconsContainer'>
            <div title="Submit changes">
                <BackupRoundedIcon onClick={() => save(name, url)} />
            </div>
            <div title="Cancel editing">
                <CancelPresentationRoundedIcon onClick={() => cancel()} />
            </div>
        </div>
    </div>
}

export default LinkEdit;
