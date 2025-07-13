import { useDispatch, useSelector } from "react-redux";
import { selectQuizInfo, setQuizStarted, setUserAnswers } from "../app/features/quizInfoSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IResult } from "../interfaces";
import ResultsTable from "../components/ResultsTable";
import { selectResults, setResults } from "../app/features/resultsSlice";
import { Link } from "react-router-dom";

const ResultPage = () => {

    const { quizStarted, userAnswers, language } = useSelector(selectQuizInfo);
    const { results } = useSelector(selectResults)

    const [currentResult, setCurrentResult] = useState<IResult | null>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (quizStarted) {
            fetch('http://localhost:4000/api/result', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    languageName: language.name,
                    userAnswers
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    const newResults = [...results, data]

                    dispatch(setResults(newResults))
                    
                    return setCurrentResult(data);
                })
                .finally(() => {
                    dispatch(setQuizStarted(false))
                    dispatch(setUserAnswers({}));
                })
        } else {
            navigate("/results")
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!currentResult) {
        return (
            <div className="h-64 border-[3px] border-dark-blue-color flex justify-center items-center">
                <div className="text-3xl">Loading...</div>
            </div>
        ) 
    }

    return (
        <main>
            <div className="px-5 py-8 border-[3px] border-dark-blue-color text-gray-800">
                <p className="flex justify-between mb-3">Attempts : <span>{currentResult.attempts} / {currentResult.questions}</span></p>
                <p className="flex justify-between mb-3">Earned points : <span>{currentResult.earnedPoints} / {currentResult.quizPoints}</span></p>
                <p className="flex justify-between mb-5">Percentage : <span>{currentResult.percentage}%</span></p>
                <p className="flex justify-between">Result :
                    <span className={`${currentResult.isPassed ? 'text-green-500' : 'text-red-600'}`}>
                        {currentResult.isPassed ? "Passed" : "Failed"}
                    </span>
                </p>
            </div>
            <Link
                to={"/"}
                className="bg-primary px-6 py-3 w-fit rounded my-5 flex text-white mx-auto"
            >
                Restart
            </Link>

            <ResultsTable />
        </main>
    )
}

export default ResultPage;