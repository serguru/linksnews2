import "./Page.css"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import Row from "../row/Row";


const Page = () => {
    const { name } = useParams();

    const page = useSelector(state => {
        const pages = state.accountData.account?.pages;
        const page = pages?.find(x => x.name === name);
        return page;
    })


    return page && page.rows ? (
        <div className="pageContainer">
            {
                page.rows.map(row => (
                    <div key={row.name}>
                        <Row row={row} />
                        {/* {row.name} */}
                    </div>
                ))
            }
        </div>
    ) : (
        <div>No {name} page found or no page rows</div>

    )

    // return <div style={{ fontSize: "50px" }}>
    //     Now showing  {page.name}
    // </div>;
}

export default Page