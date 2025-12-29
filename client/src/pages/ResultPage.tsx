import { useGetResult } from "../hooks/result"
import PreviousResultsTable from "../components/PreviousResultsTable"
import Loading from "../components/Loading"
import Error from "../components/Error"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { selectQuizInfo } from "../app/features/quizInfoSlice"
import UserWrongAnswers from "../components/UserWrongAnswers"
import { Link } from "react-router-dom"

const ResultPage = () => {

    const {
        result,
        isLoading,
        errorMessage

    } = useGetResult()

    const { quizStarted } = useSelector(selectQuizInfo)

    const navigate = useNavigate()

    useEffect(() => {
        if (!quizStarted) {
            navigate("/previous-results", { replace: true })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate])


    if (errorMessage) {
        return <Error title="Failed to Process the Result" text={errorMessage} />
    }

    if (isLoading || !result) {
        return <Loading title="Loading Result" text="Processing your quiz result..." />
    }

    return (
        <>
        <section className="border-b border-secondary/30 py-10 font-semibold">
            <h2 className="font-bold text-center text-xl md:text-3xl mb-10">{result.language} Quiz Result</h2>
            <div className="flex flex-col gap-3 mb-10">
                <p className="flex justify-between">Attempts: <span>{result.attempts}/{result.questions}</span></p>
                <p className="flex justify-between">Points: <span>{result.earnedPoints}/{result.quizPoints}</span></p>
                <p className="flex justify-between">Percentage: <span>{result.percentage}%</span></p>
                <p className="flex justify-between">Result:
                    <span className={`${result.isPassed ? 'text-green-600' : 'text-red-600'}`}>
                        {result.isPassed ? "Passed" : "Failed"}
                    </span>
                </p>
            </div>
            <Link
                to={"/"}
                className="px-6 py-3 rounded-md block text-center bg-primary text-white font-semibold"
            >
                Start New Quiz
            </Link>
        </section>
        {result.wrongAnsweredQuestions.length > 0 && <UserWrongAnswers wrongAnsweredQuestions={result.wrongAnsweredQuestions} />}
        <PreviousResultsTable />
        </>
    )
}

export default ResultPage