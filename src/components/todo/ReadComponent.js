import React, { useEffect, useState } from 'react'
import { getOne } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';

const initState = {
    seq: 0,
    title: '',
    writer: '',
    dueDate: '',
    complete: false
}

function ReadComponents({ seq }) {
    const [todo, setTodo] = useState(initState); // 상태가 바뀌면 자동으로 렌더링.
    const { moveToList, moveToModify } = useCustomMove();

    // 어떤 상황이 됐을때 얘가 동작을 할거냐.
    // 여기서는 seq가 변경됐으니 동작.
    // seq가 안바뀌었으면 데이터가 바뀌었더라도 함수호출안함. -> 기동기함수 : 무한호출 방지.
    useEffect(() => {
        getOne(seq).then(data => {
            if (data != null) {
                setTodo(data)
            }
        })
    }, [seq]);

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {makeDiv('Tno', todo.seq)}
            {makeDiv('Writer', todo.writer)}
            {makeDiv('Title', todo.title)}
            {makeDiv('Title', todo.complete ? 'Completed' : 'Not Yet')}

            {/* buttons.........start */}
            <div className="flex justify-end p-4">
                <button type="button"
                    className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                    onClick={() => moveToList()}
                >
                    List
                </button>

                <button type="button"
                    className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                    onClick={() => moveToModify(todo.seq)}
                >
                    Modify
                </button>
            </div>
        </div >


    )
}

const makeDiv = (title, value) =>
    <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">{title}</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                {value}
            </div>
        </div>
    </div>

export default ReadComponents