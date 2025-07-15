import { useDispatch, useSelector } from "react-redux";
import { selectQuizInfo, setQuizStarted, setUserAnswers } from "../app/features/quizInfoSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IResult } from "../interfaces";
import { selectResults, setResults } from "../app/features/resultsSlice";
import Loading from "../components/Loading";
import Error from "../components/Error";
import ResultsTable from "../components/ResultsTable";

const ResultPage = () => {

    const { quizStarted, userAnswers, language } = useSelector(selectQuizInfo);
    const { results } = useSelector(selectResults)

    const [currentResult, setCurrentResult] = useState<IResult | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function processQuizResult() {
            try {
                const res = await fetch('http://localhost:4000/api/result', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userAnswers
                    })
                })

                const result: IResult = await res.json();

                result["language"] = language.name;

                const newResults = [...results, result];

                dispatch(setResults(newResults));
                setCurrentResult(result);

            } catch {
                setErrorMessage("There was an issue processing the quiz result.")
            } finally {
                dispatch(setQuizStarted(false))
                dispatch(setUserAnswers({}));
            }
        }

        if (quizStarted) {
            processQuizResult();
        } else {
            navigate("/results");
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (errorMessage) {
        return <Error title="Failed to Process the Result" text={errorMessage} />
    }

    if (!currentResult) {
        return <Loading title="Loading Result" text="Processing your quiz result..." />
    }

    return (
        <>
        <section className="border-b border-secondary/30 font-semibold">
            <h2 className="font-bold text-center text-xl md:text-3xl">{language.name} Quiz Result</h2>
            <div className="flex flex-col gap-3 py-10">
                <p className="flex justify-between">Attempts: <span>{currentResult.attempts}/{currentResult.questions}</span></p>
                <p className="flex justify-between">Points: <span>{currentResult.earnedPoints}/{currentResult.quizPoints}</span></p>
                <p className="flex justify-between">Percentage: <span>{currentResult.percentage}%</span></p>
                <p className="flex justify-between">Result:
                    <span className={`${currentResult.isPassed ? 'text-green-600' : 'text-red-600'}`}>
                        {currentResult.isPassed ? "Passed" : "Failed"}
                    </span>
                </p>
            </div>
        </section>
        <ResultsTable />
        </>
    )
}

export default ResultPage;