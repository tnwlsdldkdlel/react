import React from 'react'

function setPage(startPage, endPage) {
    const pageArr = [];

    for (var i = 0; i < endPage; i++) {
        pageArr.push(startPage++);
    };

    return pageArr;
}

function PageComponent({ serverData, movePage }) {
    var pageArr = [];
    pageArr = setPage(serverData.startPage, serverData.endPage);

    return (
        <div className="m-6 flex justify-center">
            {serverData.prev ?
                <div className="m-2 p-2 w-16 text-center font-bold text-blue-400 "
                    onClick={() => movePage({ page: serverData.page - 1 })}>
                    Prev </div> : <></>}
            {pageArr.map(pageNum =>
                <div key={pageNum}
                    className={`m-2 p-2 w-12 text-center rounded shadow-md text-white
        ${serverData.page !== pageNum ? 'bg-gray-500' : 'bg-blue-400'}`}
                    onClick={() => movePage({ page: pageNum })}>
                    {pageNum}
                </div>
            )}
            {serverData.next ?
                <div className="m-2 p-2 w-16 text-center font-bold text-blue-400"
                    onClick={() => movePage({ page: serverData.page + 1 })}>
                    Next
                </div> : <></>}
        </div>
    )
}

export default PageComponent