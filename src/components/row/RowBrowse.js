import "./RowBrowse.css"
import Column from '../column/Column'
import React, { useState } from 'react'

const RowBrowse = ({ row, select }) => {

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

    return row ? (
        <div className="rowContainer"
            onMouseEnter={(e) => {
                mouseEnter(e)
            }}

            onMouseLeave={() => mouseLeave()}
        >
            {btn && <button onClick={() => select(row)}>Select</button>}
            {row.name && <div>{row.name}</div>}
            {
                row.columns.map(column => (
                    <div key={column.name}>
                        <Column column={column} />
                    </div>
                ))
            }
        </div>
    ) : (
        <div>No columns</div>
    )
}

export default RowBrowse