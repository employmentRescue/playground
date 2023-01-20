import Header from "../components/DefaultLayout/Header"
import Footer from "../components/DefaultLayout/Footer"
import { Outlet } from "react-router-dom"

export default function DefaultPage() {
    return (
        <div className="bg-gray-100 w-screen h-screen flex flex-col justify-between">
            <Header />
            <Outlet />
            <Footer />
        </div>

    )
}