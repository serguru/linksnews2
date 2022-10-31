import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import "./Pages.css";

const PageHighlight = ({ page, add, edit, remove, cancel }) => {
    return <div className='highlightContainer'>
        <div>Page "{page.name}"</div>
        <div className='iconsContainer'>
            <div title="Add new page">
                <AddCircleOutlineRoundedIcon onClick={() => add()} />
            </div>
            <div title="Edit page">
                <EditRoundedIcon onClick={() => edit(page)} />
            </div>
            <div title="Remove page">
                <RemoveCircleOutlineRoundedIcon onClick={() => remove(page)} />
            </div>
            <div title="Cancel editing">
                <CancelPresentationRoundedIcon onClick={() => cancel()} />
            </div>
        </div>
    </div>
}

export default PageHighlight;