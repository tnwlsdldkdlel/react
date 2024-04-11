import { useParams } from "react-router-dom";
import ReadComponents from "../../components/todo/ReadComponent";

const ReadPage = () => {
    const { seq } = useParams();
   
    return (
        <div className="font-extrabold w-full bg-white mt-6">
            <div className="text-2xl "> Todo Read Page Component {seq} </div>
            <ReadComponents seq={seq} />
        </div>
    );
}

export default ReadPage;