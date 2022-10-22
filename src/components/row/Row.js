import "./Row.css"
import Column from '../column/Column'

const Row = ({ row }) => {
    return row && row.columns ? (
        <div className="rowContainer">
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

export default Row