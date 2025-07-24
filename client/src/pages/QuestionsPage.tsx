import { useDispatch, useSelector } from "react-redux"
import { selectQuizInfo, setUserAnswers } from "../app/features/quizInfoSlice"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
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

    const { questions, language, isError, errorMessage } = useGetQuestionsByLanguage(searchParams.get("language") as string)
    const [index, setIndex] = useState(0)

    const { userAnswers } = useSelector(selectQuizInfo)

    const [isFullscreen, setIsFullscreen] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const finishQuiz = useCallback(() => {
        navigate("/result", { replace: true })
    }, [navigate])

    const endQuizOnUnFullscreen = useCallback(() => {
        if (!document.fullscreenElement) finishQuiz()
    }, [finishQuiz])

    const triggerFullscreen = async () => {
        await document.documentElement.requestFullscreen()

        window.addEventListener("fullscreenchange", endQuizOnUnFullscreen)
        window.addEventListener('blur', finishQuiz)
        setIsFullscreen(true)
    }

    useEffect(() => {
        // exit full screen mode and remove the events listener when the component unmounts
        return () => {
            window.removeEventListener("fullscreenchange", endQuizOnUnFullscreen)
            window.removeEventListener('blur', finishQuiz)
            if (document.fullscreenElement) {
                document.exitFullscreen()
            }
        }
    }, [endQuizOnUnFullscreen, finishQuiz])

    if (isError) {
        return <Error title="Failed to Get Questions" text={errorMessage} />
    }

    if (!questions) {
        return <Loading title="Loading Quiz" text="Getting your questions ready..." />
    }

    if (!isFullscreen) {
        return <QuizInstructions triggerFullscreen={triggerFullscreen} />
    }

    const handleChange = (id: string, answer: string) => {
        const newUserAnswers = { ...userAnswers, [id]: answer }

        dispatch(setUserAnswers(newUserAnswers))
    }

    const prevQuestion = () => {
        if (index !== 0) {
            setIndex(prev => prev - 1)
        }
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
                handleChange={handleChange}
            />
            <Controllers
                questionsLength={questions.length}
                index={index}
                prevQuestion={prevQuestion}
                nextQuestion={nextQuestion}
            />
        </div>
    )
}

export default QuestionsPage