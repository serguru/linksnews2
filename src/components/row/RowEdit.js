import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import "./Row.css";
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';

const RowEdit = ({ row, save, cancel }) => {

    const [name, setName] = useState(row.name);

    return <div className="highlightContainer">
        <div className="tf">
            <TextField id="name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
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

export default RowEdit;
