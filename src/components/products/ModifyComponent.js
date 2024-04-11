import React, { useEffect, useRef, useState } from 'react'
import FetchingModal from '../common/FetchingModal';
import { API_SERVER_HOST } from "../../api/todoApi";
import { getOne, putOne } from '../../api/productsApi';

const initState = {
    delFlag: false,
    files: [],
    name: "",
    pdesc: "",
    price: 0,
    seq: 0,
    uploadedFileNames: [],
}

function ModifyComponent({ seq }) {
    const [product, setProduct] = useState(initState);
    const [fetching, setFetching] = useState(false);
    const [deleteFileNames, setDeleteFileNames] = useState([]);
    const host = API_SERVER_HOST;
    const uploadRef = useRef();

    useEffect(() => {
        getOne(seq).then(result => {
            setProduct(result);
            setFetching(false);
        })
    }, [seq])

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value;

        setProduct(product);
    }

    const deleteOldImages = (file) => {
        const resultFile = product.uploadedFileNames.filter(data => data !== file);
        product.uploadedFileNames = resultFile;
        setDeleteFileNames(prev => [...prev, file]);

        setProduct({ ...product });
    }

    const handleClickModify = () => {
        const formData = new FormData();
        const files = uploadRef.current.files;

        // 새로등록한 파일
        for (var i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        
        // 삭제한 파일
        for (var i = 0; i < deleteFileNames.length; i++) {
            formData.append("deleteFileNames", deleteFileNames[i]);
        }

        formData.append("seq", seq);
        formData.append("name", product.name);
        formData.append("pdesc", product.pdesc);
        formData.append("price", product.price);

        setFetching(true);

        putOne(formData).then(result => {
            console.log(result);
            setFetching(false);
        })

    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {fetching ? <FetchingModal /> : <></>}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="name" type={'text'} value={product.name} onChange={handleChangeProduct} ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                        name="pdesc" rows="4" onChange={handleChangeProduct} value={product.pdesc}> {product.pdesc} </textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="price" type={'number'} value={product.price} onChange={handleChangeProduct}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
                    <select name="delFlag" value={product.delFlag} onChange={handleChangeProduct}
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
                        <option value={false}>사용</option>
                        <option value={true}>삭제</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input ref={uploadRef} className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        type={'file'} multiple={true}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Images</div>
                    <div className="w-4/5 justify-center flex flex-wrap items-start">
                        {product.uploadedFileNames.map((imgFile, i) =>
                            <div className="flex justify-center flex-col w-1/3 m-1 align-baseline" key={i}>
                                <button className="bg-blue-500 text-3xl text-white"
                                    onClick={() => deleteOldImages(imgFile)}
                                >DELETE</button>
                                <img alt="img" src={`${host}/v1/products/view/s_${imgFile}`} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button"
                    className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500">
                    Delete
                </button>
                <button type="button" onClick={handleClickModify}
                    className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500">
                    Modify </button>
                <button type="button"
                    className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500">
                    List
                </button>
            </div>
        </div>
    );
}

export default ModifyComponent