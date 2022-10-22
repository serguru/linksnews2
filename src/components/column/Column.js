import "./Column.css"
import Link from "../link/Link"

const Column = ({column}) => {

    return column && column.links ? (
        <div className="columnContainer">
            {
                column.links.map(link => (
                    <div key={link.name}>
                        <Link link={link} />
                    </div>
                ))
            }
        </div>
    ) : (
        <div>No links</div>
    )
}

export default Column