import React from 'react';
import ListComponent from '../../components/todo/ListComponent';

function ListPage() {

    return (
        <div className="p-4 w-full bg-orange-200 ">
            <div className="text-3xl font-extrabold">
                List Page Componet
            </div>
            <ListComponent></ListComponent>
        </div>
    )
}

export default ListPage