import React, { useRef, useState } from 'react'
import { postAdd } from '../../api/productsApi';
import FetchingModal from '../common/FetchingModal';
import ResultModal from "../common/ResultModal";
import useCustomMove from '../../hooks/useCustomMove';

const initState = {
    name: "",
    pdesc: "",
    price: 0,
    files: []
}

function AddComponent() {
    const [product, setProduct] = useState(initState);
    const uploadRef = useRef(); // 저장공간, dom요소에 접근하기 위해 사용되는 react hook
    // js querySelector 처럼 직접 dom을 선택할때 사용
    const [fetching, setFetching] = useState(false);
    const [result, setResult] = useState(null);
    const { moveToList } = useCustomMove();

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value;

        setProduct({ ...product });
    }

    const handleClickAdd = (e) => {
        const formData = new FormData();
        const files = uploadRef.current.files;

        for (var i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        formData.append("name", product.name);
        formData.append("pdesc", product.pdesc);
        formData.append("price", product.price);

        setFetching(true);

        postAdd(formData).then(data => {
            setFetching(false);
            setResult(data.code);
        })
    }

    const closeModal = () => {
        setResult(null);
        moveToList({ page: 1 })
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="name" type={'text'} value={product.name} onChange={handleChangeProduct} >
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                        name="pdesc" rows="4" onChange={handleChangeProduct} value={product.pdesc}>
                        {product.pdesc}
                    </textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="price" type={'number'} value={product.price} onChange={handleChangeProduct}>
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input
                        ref={uploadRef}
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        type={'file'} multiple={true}>
                    </input>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button"
                        className="rounded p-4 w-36 bg-blue-500 text-xl text-white "
                        onClick={handleClickAdd} >
                        ADD
                    </button>
                </div>
            </div>

            {fetching ? <FetchingModal /> : <></>}
            {result ? <ResultModal
                callbackFn={closeModal}
                title={'Product Add Result'}
                content={`${result}`}
            /> : <></>}
        </div>
    );


}

export default AddComponent