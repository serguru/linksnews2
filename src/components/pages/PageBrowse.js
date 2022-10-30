import { Link } from "react-router-dom"
import React, { useState } from 'react'

const PageBrowse = ({ page, select }) => {

    const [btn, setBtn] = useState(false);

    const mouseEnter = (e) => {
        if (!e.ctrlKey) {
            return;
        }
        setBtn(true);
    }

    const mouseLeave = () => {
        setBtn(false);
    }


    return <div
        onMouseEnter={(e) => {
            mouseEnter(e)
        }}

        onMouseLeave={() => mouseLeave()}
    >
        {btn && <button onClick={() => select(page)}>Select</button>}
        <Link to={"page/" + page.path}>{page.name}</Link>
    </div>
}

export default PageBrowse;