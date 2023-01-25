import Header from "../components/DefaultLayout/Header"
import { Outlet } from "react-router-dom"

export default function DefaultPage2() {
    return (
        <div className="bg-gray-100 w-screen h-screen flex flex-col justify-start">
            <Header />
            <Outlet />
        </div>

    )
}