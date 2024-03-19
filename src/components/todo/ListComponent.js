import React, { useEffect, useState } from 'react'
import { getList } from '../../api/todoApi';
import { createSearchParams } from 'react-router-dom';

const getNum = (param, defaultValue) => {
    if (!param) {
        return defaultValue;
    }

    return parseInt(param);
}

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

function ListComponent({pageParam}) {
    const [list, setList] = useState(initState);

    const page = getNum(pageParam.page, 1);
    const size = getNum(pageParam.size, 10);

    pageParam = createSearchParams({page,size}).toString

    // page, size 변경되면 호출
    useEffect(() => {
        getList(pageParam).then(data => {
            setList(data)
        })
    }, [pageParam.page, pageParam.size])

    return (
        <div>ListComponent</div>
    )
}

export default ListComponent