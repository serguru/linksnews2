import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import "./Pages.css";

const PageHighlight = ({ page, add, edit, remove, cancel }) => {
    return <div className='highlightContainer'>
        <div>Page "{page.name}"</div>
        <div className='iconsContainer'>
        <div title="Add new page before">
                <AddCircleOutlineRoundedIcon onClick={() => add(page, true)} />
            </div>
            <div title="Add new page after">
                <AddCircleRoundedIcon onClick={() => add(page, false)} />
            </div>
            <div title="Edit page">
                <EditRoundedIcon onClick={() => edit(page)} />
            </div>
            <div title="Remove page (Ctrl+click)">
                <RemoveCircleOutlineRoundedIcon onClick={(e) => remove(page,e)} />
            </div>
            <div title="Cancel editing">
                <CancelPresentationRoundedIcon onClick={() => cancel()} />
            </div>
        </div>
    </div>
}

export default PageHighlight;