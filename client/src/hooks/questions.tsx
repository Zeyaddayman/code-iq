import { useCallback, useState } from "react"
import { LANGUAGES } from "../constants"
import { ILanguage, IQuestion } from "../interfaces"
import { useDispatch } from "react-redux"
import { setQuizLanguage, setQuizStarted } from "../app/features/quizInfoSlice"

async function fetchQuestions(quizLanguage: string) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/questions?language=${quizLanguage}`,
            { signal: AbortSignal.timeout(15000) }
        )

        const data = await res.json()

        if (res.status === 200) {
            const matchLanguage = LANGUAGES.find((lang) => lang.slug === data.language)

            return {
                data: { questions: data.questions, language: matchLanguage! },
                errorMessage: null
            }
        }
        else {
            return {
                data: { questions: [], language: null },
                errorMessage: data.message
            }
        }
    }
    catch {
        return {
            data: { questions: [], language: null },
            errorMessage: "There was an issue loading the quiz questions. Please try again"
        }
    }
}

interface IState {
    data: { questions: IQuestion[], language: ILanguage | null }
    isLoading: boolean
    errorMessage: string | null
}

export const useGetQuestionsByLanguage = (quizLanguage: string) => {

    const [state, setState] = useState<IState>({
        isLoading: false,
        data: { questions: [], language: null },
        errorMessage: null
    })

    const dispatch = useDispatch()

    const triggerGetQuestions = useCallback(async () => {

        setState((prev) => ({ ...prev, isLoading: true }))

        const { data, errorMessage } = await fetchQuestions(quizLanguage)

        if (data.language && data.questions.length > 0) {
            dispatch(setQuizLanguage(data.language))
            dispatch(setQuizStarted(true))
        }

        setState({
            isLoading: false,
            data,
            errorMessage
        })

    }, [dispatch, quizLanguage])

    return {
        triggerGetQuestions,
        isLoading: state.isLoading,
        questions: state.data.questions,
        language: state.data.language,
        errorMessage: state.errorMessage
    }
}