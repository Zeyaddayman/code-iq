import { useEffect, useState } from "react"
import { IResult } from "../interfaces"
import { useDispatch, useSelector } from "react-redux"
import { selectQuizInfo, setQuizStarted, setUserAnswers } from "../app/features/quizInfoSlice"
import { selectPrevResults, setPrevResults } from "../app/features/prevResultsSlice"

interface IState {
    result: IResult | null
    isLoading: boolean
    errorMessage: string | null
}

export const useGetResult = () => {

    const { quizStarted, userAnswers, language } = useSelector(selectQuizInfo)
    const { prevResults } = useSelector(selectPrevResults)

    const [state, setState] = useState<IState>({
        result: null,
        isLoading: false,
        errorMessage: null
    })

    const dispatch = useDispatch()

    useEffect(() => {
        async function processQuizResult() {
            try {

                setState((prev) => ({ ...prev, isLoading: true }))

                const res = await fetch(`${import.meta.env.VITE_API_URL}/result`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userAnswers }),
                    signal: AbortSignal.timeout(15000)
                })

                const result: IResult = await res.json()

                result["language"] = language.name

                setState((prev) => ({ ...prev, result }))

                const newResults = [...prevResults, result]
                
                dispatch(setPrevResults(newResults))

            } catch {
                setState((prev) => ({
                    ...prev,
                    errorMessage: "There was an issue processing your quiz result"
                }))
            } finally {
                setState((prev) => ({ ...prev, isLoading: false }))

                dispatch(setUserAnswers({}))
                dispatch(setQuizStarted(false))
            }
        }

        if (quizStarted) processQuizResult()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        result: state.result,
        isLoading: state.isLoading,
        errorMessage: state.errorMessage,
    }
}