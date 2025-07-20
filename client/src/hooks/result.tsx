import { useEffect, useState } from "react"
import { IResult } from "../interfaces"
import { useDispatch, useSelector } from "react-redux";
import { selectQuizInfo, setQuizStarted, setUserAnswers } from "../app/features/quizInfoSlice";
import { useNavigate } from "react-router";
import { selectPrevResults, setPrevResults } from "../app/features/prevResultsSlice";

interface IState {
    currentResult: IResult | null;
    isError: boolean;
    errorMessage: string;
}

export const useGetResult = () => {
    const { quizStarted, userAnswers, language } = useSelector(selectQuizInfo);
    const { prevResults } = useSelector(selectPrevResults)

    const [state, setState] = useState<IState>({
        currentResult: null,
        isError: false,
        errorMessage: "There was an issue processing the quiz result."
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function processQuizResult() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/result`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userAnswers
                    })
                })

                const result: IResult = await res.json();

                result["language"] = language.name;

                const newResults = [...prevResults, result];

                dispatch(setPrevResults(newResults));
                setState((prev) => ({
                    ...prev,
                    currentResult: result
                }));

            } catch {
                setState((prev) => ({
                    ...prev,
                    isError: true,
                }));
            } finally {
                dispatch(setQuizStarted(false))
                dispatch(setUserAnswers({}));
            }
        }

        if (quizStarted) {
            processQuizResult();
        } else {
            navigate("/previous-results", { replace: true });
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        currentResult: state.currentResult,
        isError: state.isError,
        errorMessage: state.errorMessage
    }
}