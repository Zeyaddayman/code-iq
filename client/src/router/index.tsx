import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import PageNotFound from "../pages/PageNotFound";
import QuestionsPage from "../pages/QuestionsPage";
import ResultPage from "../pages/ResultPage";
import ResultsPage from "../pages/ResultsTablePage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />} >
                <Route index element={<HomePage />} />
                <Route path="questions" element={<QuestionsPage />} />
                <Route path="result" element={<ResultPage />} />
                <Route path="results" element={<ResultsPage />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
        </>
    )
)

export default router;