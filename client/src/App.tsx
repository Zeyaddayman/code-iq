import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
    return (
        <main className="py-12 bg-soft-while-color min-h-screen overflow-y-scroll">
            <RouterProvider router={router} />
        </main>
    )
}


export default App;
