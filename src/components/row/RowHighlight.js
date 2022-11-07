

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import "./Row.css";

const RowHighlight = ({ row, add, edit, remove, cancel }) => {
    return <div className='highlightContainer'>
        <div>Row "{row.name}"</div>
        <div className='iconsContainer'>
            <div title="Add new row before">
                <AddCircleOutlineRoundedIcon onClick={() => add(row, true)} />
            </div>
            <div title="Add new row after">
                <AddCircleRoundedIcon onClick={() => add(row, false)} />
            </div>
            <div title="Edit row">
                <EditRoundedIcon onClick={() => edit(row)} />
            </div>
            <div title="Remove row">
                <RemoveCircleOutlineRoundedIcon onClick={() => remove(row)} />
            </div>
            <div title="Cancel editing">
                <CancelPresentationRoundedIcon onClick={() => cancel()} />
            </div>
        </div>
    </div>
}

export default RowHighlight;