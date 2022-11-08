import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import "./Column.css";

const ColumnHighlight = ({ column, add, edit, remove, cancel }) => {
    return <div className='highlightContainer'>
        <div>Column "{column.name}"</div>
        <div className='iconsContainer'>
            <div title="Add new column before">
                <AddCircleOutlineRoundedIcon onClick={() => add(column, true)} />
            </div>
            <div title="Add new column after">
                <AddCircleRoundedIcon onClick={() => add(column, false)} />
            </div>
            <div title="Edit column">
                <EditRoundedIcon onClick={() => edit(column)} />
            </div>
            <div title="Remove column (Ctrl+click)">
                <RemoveCircleOutlineRoundedIcon onClick={(e) => remove(column, e)} />
            </div>
            <div title="Cancel editing">
                <CancelPresentationRoundedIcon onClick={() => cancel()} />
            </div>
        </div>
    </div>
}

export default ColumnHighlight;