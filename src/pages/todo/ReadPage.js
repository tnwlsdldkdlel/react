import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";

const ReadPage = () => {
    const { tno } = useParams();
    const navigate = useNavigate();

    const [queryParams] = useSearchParams();

    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 1;

    const queryStr = createSearchParams({ page: page, size: size }).toString();

    const moveToModify = (tno) => {
        navigate({
            pathname: `/todo/modify/${tno}`,
            search: queryStr
        })
    }

    const moveToList = () => {
        navigate({
            pathname: `/todo/list`,
            search: queryStr
        })
    }

    return (
        <div className="text-3xl font-extrabold">
            Todo Read Page Component {tno} -- page {page} -- size {size}

            <div>
                <button onClick={() => moveToModify(tno)}>Test Modify</button>
                <button onClick={moveToList}>Test List</button>
            </div>
        </div>
    );
}

export default ReadPage;