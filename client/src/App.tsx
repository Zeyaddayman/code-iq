import { Route, Routes } from "react-router"
import { lazy, Suspense } from "react"
import { applyTheme } from "./utils"
import RootLayout from "./pages/Layout"
import HomePage from "./pages/HomePage"
const QuestionsPage = lazy(() => import("./pages/QuestionsPage"))
const ResultPage = lazy(() => import("./pages/ResultPage"))
import PreviousResultsPage from "./pages/PreviousResultsPage"
import PageNotFound from "./pages/PageNotFound"
import Loading from "./components/Loading"


const App = () => {
    applyTheme()
    
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="questions" element={
                    <Suspense fallback={<Loading title="Loading Quiz" text="Getting your questions ready..." />}>
                        <QuestionsPage />
                    </Suspense>
                } />
                <Route path="result" element={
                    <Suspense fallback={<Loading title="Loading Result" text="Processing your quiz result..." />}>
                        <ResultPage />
                    </Suspense>
                } />
                <Route path="previous-results" element={<PreviousResultsPage />} />

                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}

export default App