import { useDispatch, useSelector } from "react-redux"
import { selectQuizInfo, setQuizLanguage, setQuizStarted, setUserAnswers } from "../app/features/quizInfoSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IQuestion } from "../interfaces";
import Question from "../components/Question";
import Controllers from "../components/Controllers";
import { API_URL, LANGUAGES, QUIZ_DURATION } from "../constants";
import Timer from "../components/Timer";
import Loading from "../components/Loading";
import Error from "../components/Error";

let languageName: string

const QuestionsPage = () => {

    const { userAnswers } = useSelector(selectQuizInfo);
    const [searchParams] = useSearchParams();

    const [questions, setQuestions] = useState<IQuestion[] | null >(null);
    const [index, setIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchQuestions() {

            const languageParam = searchParams.get("language");
            try {
                const res = await fetch(`${API_URL}/api/questions?language=${languageParam}`)

                const data = await res.json()

                if (res.status === 200) {
                    const matchLanguage = LANGUAGES.find((lang) => lang.slug === data.language);
                    languageName = matchLanguage!.name;

                    dispatch(setQuizLanguage(matchLanguage!));
                    dispatch(setQuizStarted(true));
                    setQuestions(data.questions);
                } else {
                    setErrorMessage(data.message)
                }
            } catch {
                setErrorMessage("There was an issue loading the quiz questions. Please try again")
            }
        }

        fetchQuestions();

    }, [searchParams, dispatch])

    if (errorMessage) {
        return <Error title="Failed to Get Questions" text={errorMessage} />
    }

    if (!questions) {
        return <Loading title="Loading Quiz" text="Getting your questions ready..." />;
    }

    const handleChange = (id: string, answer: string) => {
        const newUserAnswers = { ...userAnswers, [id]: answer };

        dispatch(setUserAnswers(newUserAnswers))
    }

    const prevQuestion = () => {
        if (index !== 0) {
            setIndex(prev => prev - 1);
        }
    }

    const nextQuestion = () => {
        if (index === questions.length - 1) {
            finishQuiz();
        } else {
            setIndex(prev => prev + 1);
        }
    }

    const finishQuiz = () => {
        navigate("/result")
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex gap-3 justify-between items-center">
                <h2 className="text-xl md:text-3xl font-bold">{languageName} Quiz</h2>
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

export default QuestionsPage;