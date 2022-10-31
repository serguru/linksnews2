import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import "./Pages.css";
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';

const PageEdit = ({ page, save, cancel }) => {

    const [name, setName] = useState(page.name);
    const [path, setPath] = useState(page.path);

    return <div className="highlightContainer">
        <TextField id="name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="tf">
            <TextField id="path" label="Path" variant="outlined" value={path} onChange={(e) => setPath(e.target.value)} />
        </div>


        <div className='iconsContainer'>
            <div title="Submit changes">
                <BackupRoundedIcon onClick={() => save(name, path)} />
            </div>
            <div title="Cancel editing">
                <CancelPresentationRoundedIcon onClick={() => cancel()} />
            </div>
        </div>
    </div>
}

export default PageEdit;
