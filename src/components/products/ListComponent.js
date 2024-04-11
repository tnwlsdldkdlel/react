import React, { useEffect, useState } from 'react'
import { getList } from '../../api/productsApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import { API_SERVER_HOST } from "../../api/todoApi";

const initState = {
    data: [],
    page: {
        page: 0,
        size: 0,
        startPage: 0,
        endPage: 0,
        amount: 0,
        prev: false,
        next: false,
        allPage: 0
    },
}

function ListComponent() {
    const [products, setProducts] = useState(initState);
    const { page, size, moveToRead, refresh, moveToList } = useCustomMove();
    const host = API_SERVER_HOST;

    useEffect(() => {
        getList({ page, size }).then(result => {
            console.log(result);
            setProducts(result);
        })
    }, [page, size, refresh]);

    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            <div className="flex flex-wrap mx-auto p-6">
                {products.data.map(product =>
                    <div key={product.seq} className="w-1/2 p-1 rounded shadow-md border-2" onClick={() => moveToRead(product.seq)}>
                        <div className="flex flex-col h-full">
                            <div className="font-extrabold text-2xl p-2 w-full ">{product.seq}</div>
                            <div className="text-1xl m-1 p-2 w-full flex flex-col">
                                <div className="w-full overflow-hidden ">
                                    <img alt="product" className="m-auto rounded-md w-60"
                                        src={`${host}/v1/products/view/s_${product.uploadedFileNames[0]}`} />
                                </div>
                                <div className="bottom-0 font-extrabold bg-white">
                                    <div className="text-center p-1">
                                        이름: {product.name}
                                    </div>
                                    <div className="text-center p-1">
                                        가격: {product.price}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <PageComponent serverData={products.page} movePage={moveToList}></PageComponent>
        </div>
    );
}

export default ListComponent