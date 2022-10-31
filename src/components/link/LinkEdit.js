import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import "./Link.css";
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';

const LinkEdit = ({ link, save, cancel }) => {

    const [name, setName] = useState(link.name);
    const [url, setUrl] = useState(link.url);

    return <div className="highlightContainer">
        <TextField id="name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="tf">
            <TextField id="url" label="Url" variant="outlined" value={url} onChange={(e) => setUrl(e.target.value)} />
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
