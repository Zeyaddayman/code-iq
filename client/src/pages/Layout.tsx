import { Outlet } from "react-router-dom"
import Header from "../components/Header";

const RootLayout = () => {
    return (
        <div className="container mx-auto px-8 md:px-24">
            <Header />
            <Outlet />
        </div>
    )
}

export default RootLayout;