import React, { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Loading = <div>Loading.... </div>
const ProductList = lazy(() => import("../pages/products/ListPage"))
const ProductAdd = lazy(() => import("../pages/products/AddPage"))
const ProductRead = lazy(() => import("../pages/products/ReadPage"))
const ProductModify = lazy(() => import("../pages/products/ModifyPage"))

function ProducetsRouter() {
    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><ProductList /></Suspense>

        },
        {
            path: "",
            element: <Navigate replace={"/produces/list"}></Navigate>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><ProductAdd /></Suspense>
        },
        {
            path: "read/:seq",
            element: <Suspense fallback={Loading}><ProductRead /></Suspense>
        },
        {
            path: "modify/:seq",
            element: <Suspense fallback={Loading}><ProductModify /></Suspense>
        }

    ]
}

export default ProducetsRouter