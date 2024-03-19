import React from 'react';
import { useSearchParams } from "react-router-dom";
import ListComponent from '../../components/todo/ListComponent';

function ListPage() {

    const [queryParams] = useSearchParams();

    return (
        <div className="p-4 w-full bg-orange-200 ">
            <div className="text-3xl font-extrabold">
                <ListComponent pageParam={queryParams} ></ListComponent>
            </div>
        </div>
    )
}

export default ListPage