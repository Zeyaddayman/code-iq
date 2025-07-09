import { Outlet } from "react-router-dom"

const RootLayout = () => {
    return (
        <main className="py-12 min-h-screen overflow-y-scroll">
            <div className="container mx-auto px-8 md:px-24">
                <Outlet />
            </div>
        </main>
    )
}

export default RootLayout;