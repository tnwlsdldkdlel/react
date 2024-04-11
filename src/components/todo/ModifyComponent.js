import React, { useEffect, useState } from 'react'
import { deleteOne, getOne, putOne } from '../../api/todoApi';
import ResultModal from '../common/ResultModal';
import useCustomMove from '../../hooks/useCustomMove';

const initState = {
    title: "",
    content: "",
    dueDate: "",
    complete: false
}

function ModifyComponent({ seq }) {
    const [todo, setTodo] = useState({ ...initState });
    const [result, SetResult] = useState("");
    const { moveToList, moveToRead } = useCustomMove();

    const handleChangeTodo = (e) => {
        todo[e.target.name] = e.target.value;

        setTodo({ ...todo });
    }

    const handleChangeTodoComplete = (e) => {
        todo.complete = e.target.value === "Y" ? true : false;

        setTodo({ ...todo });
    }

    const handleClickDelete = (seq) => {
        deleteOne(seq).then(data => {
            SetResult(data.code === 200 ? "Deleted" : "");
        })
    }

    const handleClickModify = (obj) => {
        putOne(obj).then(data => {
            SetResult(data.code === 200 ? "Modified" : "");
        })
    }

    useEffect(() => {
        getOne(seq).then(result => {
            setTodo(result);
            SetResult("");
        });
    }, [seq]);

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">SEQ</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100"> {todo.seq} </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="title" type={'text'} value={todo.title} onChange={handleChangeTodo} ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">CONTENT</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="content" type={'text'} value={todo.content} onChange={handleChangeTodo} ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="dueDate" type={'date'} value={todo.dueDate} onChange={handleChangeTodo} ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">COMPLETE</div>
                    <select name="status" className="border-solid border-2 rounded m-1 p-2"
                        onChange={handleChangeTodoComplete} value={todo.complete ? 'Y' : 'N'} >
                        <option value='Y'>Completed</option>
                        <option value='N'>Not Yet</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end p-4">
                <button type="button" className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={() => handleClickDelete(todo.seq)}>
                    Delete </button>
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                    onClick={() => handleClickModify(todo)}> Modify </button>
            </div>

            {result === "Deleted" ? <ResultModal title={"result"} content={"success"} callbackFn={moveToList}></ResultModal> : <></>}
            {result === "Modified" ? <ResultModal title={"result"} content={"success"} callbackFn={() => moveToRead(todo.seq)}></ResultModal> : <></>}
        </div>
    )
}

export default ModifyComponent