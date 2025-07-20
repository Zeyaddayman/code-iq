import { useGetResult } from "../hooks/result";
import PreviousResultsTable from "../components/PreviousResultsTable";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useSelector } from "react-redux";
import { selectQuizInfo } from "../app/features/quizInfoSlice";

const ResultPage = () => {

    const { currentResult, isError, errorMessage } = useGetResult();
    const { language } = useSelector(selectQuizInfo);

    if (isError) {
        return <Error title="Failed to Process the Result" text={errorMessage} />
    }

    if (!currentResult) {
        return <Loading title="Loading Result" text="Processing your quiz result..." />
    }

    return (
        <>
        <section className="border-b border-secondary/30 font-semibold mb-10">
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
        <PreviousResultsTable />
        </>
    )
}

export default ResultPage;