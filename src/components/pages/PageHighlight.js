const PageHighlight = ({ page, add, edit, remove}) => {
    return <div>
        <div>Page highlight {page.name}</div>
        <button onClick={() => add(page)}>Add</button>
        <button onClick={() => edit(page)}>Edit</button>
        <button onClick={() => remove(page)}>Remove</button>
    </div>
}

export default PageHighlight;