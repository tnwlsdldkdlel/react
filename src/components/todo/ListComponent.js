import React, { useEffect, useState } from 'react'
import useCustomMove from '../../hooks/useCustomMove';
import { getList } from '../../api/todoApi';
import PageComponent from '../common/PageComponent';
import useCustomLogin from '../../hooks/useCustomLogin';

const initState = {
    data: [

    ],
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
    const { page, size, moveToList, refresh, moveToRead } = useCustomMove();
    const [serverData, setServerData] = useState(initState);
    const { exceptionHandle } = useCustomLogin();

    useEffect(() => {
        getList({ page, size }).then(data => {
            setServerData(data);
        }).catch(err => exceptionHandle(err))
    }, [page, size, refresh]);

    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            <div className="flex flex-wrap mx-auto justify-center p-6">
                {serverData.data.map(todo =>
                    <div
                        key={todo.seq}
                        className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
                        onClick={() => moveToRead(todo.seq)}>
                        <div className="flex ">
                            <div className="font-extrabold text-2xl p-2 w-1/12"> {todo.seq} </div>
                            <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">{todo.title}</div>
                            <div className="text-1xl m-1 p-2 w-2/10 font-medium"> {todo.dueDate} </div>
                        </div>
                    </div>
                )}
            </div>

            <PageComponent serverData={serverData.page} movePage={moveToList}></PageComponent>

        </div>
    )
}

export default ListComponent