import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import PageNotFound from "../pages/PageNotFound";
import QuestionsPage from "../pages/QuestionsPage";
import ResultPage from "../pages/ResultPage";
import PreviousResultsPage from "../pages/PreviousResultsPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />} >
            <Route index element={<HomePage />} />
            <Route path="questions" element={<QuestionsPage />} />
            <Route path="result" element={<ResultPage />} />
            <Route path="previous-results" element={<PreviousResultsPage />} />

            <Route path="*" element={<PageNotFound />} />
        </Route>
    )
)

export default router;