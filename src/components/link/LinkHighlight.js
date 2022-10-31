import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import "./Link.css";

const LinkHighlight = ({ link, add, edit, remove, cancel }) => {
    return <div className='highlightContainer'>
        <div>Link "{link.name}"</div>
        <div className='iconsContainer'>
            <div title="Add new link">
                <AddCircleOutlineRoundedIcon onClick={() => add()} />
            </div>
            <div title="Edit link">
                <EditRoundedIcon onClick={() => edit(link)} />
            </div>
            <div title="Remove link">
                <RemoveCircleOutlineRoundedIcon onClick={() => remove(link)} />
            </div>
            <div title="Cancel editing">
                <CancelPresentationRoundedIcon onClick={() => cancel()} />
            </div>
        </div>
    </div>
}

export default LinkHighlight;