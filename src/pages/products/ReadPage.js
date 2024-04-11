import { useParams } from "react-router-dom";
import ReadComponent from "../../components/products/ReadComponent";

const ReadPage = () => {
    const { seq } = useParams();
    
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                Products Read Page
            </div>
            <ReadComponent seq={seq}></ReadComponent>
        </div>
    );
}
export default ReadPage;