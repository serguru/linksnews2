import { Link } from "react-router-dom"

const PageBrowse = ({ page }) => {
    return <Link to={"page/" + page.path}>{page.name}</Link>
}

export default PageBrowse;