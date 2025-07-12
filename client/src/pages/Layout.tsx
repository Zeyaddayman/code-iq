import { Outlet } from "react-router-dom"

const RootLayout = () => {
    return (
        <main className="py-12 min-h-screen flex overflow-y-scroll">
            <div className="container mx-auto px-8 md:px-24 flex-1">
                <Outlet />
            </div>
        </main>
    )
}

export default RootLayout;