import { useDispatch, useSelector } from "react-redux"
import { selectQuizInfo, setQuizStarted, setUserAnswers } from "../app/features/quizInfoSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IQuestion } from "../interfaces";
import Question from "../components/Question";
import CountDown from "../components/CountDown";
import Controllers from "../components/Controllers";
import { LANGUAGES, QUIZ_DURATION } from "../constants";

let languageName: string

const QuestionsPage = () => {

    const { userAnswers } = useSelector(selectQuizInfo);
    const [searchParams] = useSearchParams();

    const [questions, setQuestions] = useState<IQuestion[] | null >(null);
    const [index, setIndex] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const languageParam = searchParams.get("language")
        fetch(`http://localhost:4000/api/questions?language=${languageParam}`)
            .then((res) => res.json())
            .then((data) => {
                const matchLanguage = LANGUAGES.find((lang) => lang.slug === data.language)
                languageName = matchLanguage!.name

                dispatch(setQuizStarted(true));
                setQuestions(data.questions);
            })

    }, [searchParams, dispatch])

    if (!questions) {
        return <p>Loading...</p>;
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
                <CountDown quizTime={QUIZ_DURATION + 20} finishQuiz={finishQuiz} />
            </div>
            <div className="text-center my-12 text-gray-500 font-semibold">
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