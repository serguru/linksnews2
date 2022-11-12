import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import "./Pages.css";
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';

const PageEdit = ({ page, save, cancel }) => {

    const [name, setName] = useState(page.name);

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            save(name)
        }
    }

    return <div className="highlightContainer" onKeyDown={handleKeyDown}>
        <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            onFocus={event => {
                event.target.select();
            }}
        />
        <div className='iconsContainer'>
            <div title="Submit changes">
                <BackupRoundedIcon onClick={() => save(name)} />
            </div>
            <div title="Cancel editing">
                <CancelPresentationRoundedIcon onClick={() => cancel()} />
            </div>
        </div>
    </div>
}

export default PageEdit;
