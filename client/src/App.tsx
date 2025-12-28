import { Route, Routes } from "react-router"
import { applyTheme } from "./utils"
import RootLayout from "./pages/Layout"
import HomePage from "./pages/HomePage"
import QuestionsPage from "./pages/QuestionsPage"
import ResultPage from "./pages/ResultPage"
import PreviousResultsPage from "./pages/PreviousResultsPage"
import PageNotFound from "./pages/PageNotFound"


const App = () => {

    applyTheme()

    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="questions" element={<QuestionsPage />} />
                <Route path="result" element={<ResultPage />} />
                <Route path="previous-results" element={<PreviousResultsPage />} />

                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}

export default App