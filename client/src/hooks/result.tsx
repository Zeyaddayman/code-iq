import { useEffect, useState } from "react"
import { IResult } from "../interfaces"
import { useDispatch, useSelector } from "react-redux"
import { selectQuizInfo, setQuizStarted, setUserAnswers } from "../app/features/quizInfoSlice"

interface IState {
    currentResult: IResult | null
    isError: boolean
    errorMessage: string
}

export const useGetResult = () => {
    const { quizStarted, userAnswers, language } = useSelector(selectQuizInfo)

    const [state, setState] = useState<IState>({
        currentResult: null,
        isError: false,
        errorMessage: "There was an issue processing the quiz result."
    })

    const dispatch = useDispatch()

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

                const result: IResult = await res.json()

                result["language"] = language.name

                setState((prev) => ({
                    ...prev,
                    currentResult: result
                }))

            } catch {
                setState((prev) => ({
                    ...prev,
                    isError: true,
                }))
            } finally {
                dispatch(setQuizStarted(false))
                dispatch(setUserAnswers({}))
            }
        }

        if (quizStarted) {
            processQuizResult()
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        currentResult: state.currentResult,
        isError: state.isError,
        errorMessage: state.errorMessage
    }
}