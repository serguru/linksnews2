import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import "./Column.css";
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';

const ColumnEdit = ({ column, save, cancel }) => {

    const [name, setName] = useState(column.name);

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

export default ColumnEdit;
