
const PageBrowse = ({ page, click }) => {
    return <div className="clickableElement" onClick={(e) => click(e, page)} title="Ctrl+click to edit">
        {page.name}
    </div>
}

export default PageBrowse;