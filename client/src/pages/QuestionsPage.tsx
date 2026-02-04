import { useDispatch, useSelector } from "react-redux"
import { selectQuizInfo, setUserAnswers } from "../app/features/quizInfoSlice"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useCallback, useEffect, useRef, useState } from "react"
import Question from "../components/Question"
import Controllers from "../components/Controllers"
import { QUIZ_DURATION } from "../constants"
import Timer from "../components/Timer"
import Loading from "../components/Loading"
import Error from "../components/Error"
import { useGetQuestionsByLanguage } from "../hooks/questions"
import QuizInstructions from "../components/QuizInstructions"

const QuestionsPage = () => {

    const [searchParams] = useSearchParams()

    const {
        triggerGetQuestions,
        isLoading: isGettingQuestions,
        questions,
        language,
        errorMessage

    } = useGetQuestionsByLanguage(searchParams.get("language") as string)

    const [index, setIndex] = useState(0)

    const { userAnswers, quizStarted } = useSelector(selectQuizInfo)

    const [focusIdx, setFocusIdx] = useState(-1)
    const focusableElementsRef = useRef<(HTMLElement | null)[]>([])

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const finishQuiz = useCallback(() => {
        navigate("/result", { replace: true })
    }, [navigate])

    const endQuizOnUnFullscreen = useCallback(() => {
        if (!document.fullscreenElement) finishQuiz()
    }, [finishQuiz])

    const focusTrap = useCallback((e: KeyboardEvent) => {
        if (e.key === "Tab") {
            e.preventDefault()

            const firstQuestion = index === 0

            if (e.shiftKey) {
                setFocusIdx(prev => {
                    if (prev <= 0) return 4
                    else if (firstQuestion && prev === 4) return prev - 2
                    else return prev - 1
                })
            }
            else {
                setFocusIdx(prev => {
                    if (prev === 4) return 0
                    else if (firstQuestion && prev === 2) return prev + 2
                    else return prev + 1
                })
            }
        }
    }, [index])

    const focusOnClick = useCallback((e: MouseEvent) => {

        const element = e.target as HTMLElement

        if (element && focusableElementsRef.current.includes(element)) {
            const index = Number(element.getAttribute("data-index"))
            setFocusIdx(index)
        }
        else {
            setFocusIdx(-1)
        }
    }, [])

    const startQuiz = async () => {
        await document.documentElement.requestFullscreen()

        window.addEventListener("fullscreenchange", endQuizOnUnFullscreen)
        window.addEventListener("blur", finishQuiz)
        window.addEventListener("click", focusOnClick)

        await triggerGetQuestions()
    }

    useEffect(() => {
        // Exit full screen and clear event listeners when quiz ends
        return () => {
            window.removeEventListener("fullscreenchange", endQuizOnUnFullscreen)
            window.removeEventListener('blur', finishQuiz)
            window.removeEventListener("click", focusOnClick)

            if (document.fullscreenElement) document.exitFullscreen()
        }
    }, [endQuizOnUnFullscreen, finishQuiz, focusOnClick])

    useEffect(() => {
        if (quizStarted) {
            window.addEventListener("keydown", focusTrap)
        }
        return () => {
            window.removeEventListener("keydown", focusTrap)
        }
        // Clean old event listener and add new one when questions index changes
    }, [quizStarted, focusTrap])

    useEffect(() => {
        focusableElementsRef.current[focusIdx]?.focus()
    }, [focusIdx])

    if (errorMessage) {
        return <Error title="Failed to Get Questions" text={errorMessage} />
    }

    if (isGettingQuestions) {
        return <Loading title="Loading Quiz" text="Getting your questions ready..." />
    }

    if (!quizStarted) {
        return <QuizInstructions startQuiz={startQuiz} />
    }

    const handleAnswerChange = (id: string, answer: string) => {
        const newUserAnswers = { ...userAnswers, [id]: answer }

        dispatch(setUserAnswers(newUserAnswers))
    }

    const prevQuestion = () => {
        if (index !== 0) setIndex(prev => prev - 1)
    }

    const nextQuestion = () => {
        if (index === questions.length - 1) {
            finishQuiz()
        } else {
            setIndex(prev => prev + 1)
        }
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex gap-3 justify-between items-center">
                <h2 className="text-xl md:text-3xl font-bold">{language!.name} Quiz</h2>
                <Timer
                    quizDurationSeconds={QUIZ_DURATION * 60}
                    finishQuiz={finishQuiz}
                />
            </div>
            <div className="text-center my-12 text-secondary font-semibold">
                {index + 1}/{questions.length}
            </div>
            <Question
                question={questions[index]}
                userAnswers={userAnswers}
                handleChange={handleAnswerChange}
                focusableElementsRef={focusableElementsRef}
            />
            <Controllers
                questionsLength={questions.length}
                index={index}
                prevQuestion={prevQuestion}
                nextQuestion={nextQuestion}
                focusableElementsRef={focusableElementsRef}
            />
        </div>
    )
}

export default QuestionsPage