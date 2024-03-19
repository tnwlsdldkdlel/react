import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReadComponents from "../../components/todo/ReadComponent";

const ReadPage = () => {
    const { seq } = useParams();
    // const navigate = useNavigate();
    // const [queryParams] = useSearchParams();

    // const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
    // const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 1;

    //const queryStr = createSearchParams({ page: page, size: size }).toString();

    // const moveToModify = (seq) => {
    //     navigate({
    //         pathname: `/todo/modify/${seq}`,
    //         search: queryStr
    //     })
    // }

    // const moveToList = () => {
    //     navigate({
    //         pathname: `/todo/list`,
    //         search: queryStr
    //     })
    // }

    return (
        <div className="font-extrabold w-full bg-white mt-6">
            <div className="text-2xl "> Todo Read Page Component {seq} </div>
            <ReadComponents seq={seq} />
        </div>
    );
}

export default ReadPage;