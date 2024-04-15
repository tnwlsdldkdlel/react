import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";
import productRoter from "./ProducetsRouter";
import memberRouter from "./memberRouter";

const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading....</div>
const Main = lazy(() => import("../pages/MainPage"))
const About = lazy(() => import("../pages/AboutPage"))
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))
const TodoAdd = lazy(() => import("../pages/todo/AddPage"))

const ProductsIndx = lazy(() => import("../pages/products/IndexPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },

    {
        path: "about",
        element: <Suspense fallback={Loading}><About /></Suspense>
    },
    {
        path: "todo",
        element: <Suspense fallback={Loading}><TodoIndex /></Suspense>,
        children: todoRouter()
    },
    {
        path: "products",
        element: <Suspense fallback={Loading}><ProductsIndx /></Suspense>,
        children: productRoter()
    },
    {
        path: "member",
        children: memberRouter()
    }
])

export default root;