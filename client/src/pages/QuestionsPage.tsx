import { useDispatch, useSelector } from "react-redux"
import { selectQuizInfo, setUserAnswers } from "../app/features/quizInfoSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IQuestion } from "../interfaces";
import Question from "../components/Question";
import CountDown from "../components/CountDown";
import QuestionSkeleton from "../components/QuestionSkeleton";
import Controllers from "../components/Controllers";

const QuestionsPage = () => {

    const { userAnswers, quizStarted, category } = useSelector(selectQuizInfo);

    const [data, setData] = useState<{ questions: IQuestion[] } | null>();
    const [index, setIndex] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // https://quiz-app-1vbc.onrender.com/api/questions

        if (quizStarted) {
            fetch(`http://localhost:4000/api/questions?category=${category.slug}`)
                .then((res) => res.json())
                .then((data) => {
                    return setData(data.data);
                })
        } else {
            navigate("/")
        }

    }, [category.slug, navigate, quizStarted])

    if (!data) {
        return <QuestionSkeleton />;
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
        if (index === data.questions.length - 1) {
            finishQuiz();
        } else {
            setIndex(prev => prev + 1);
        }
    }

    const finishQuiz = () => {
        navigate("/result")
    }

    return (
        <main>
            <div className="flex gap-3 justify-between mb-5">
                <div className="text-secondary-color">
                    {index + 1} / {data.questions.length}
                </div>
                <CountDown quizTime={5} finishQuiz={finishQuiz} />
            </div>
            <Question
                question={data.questions[index]}
                userAnswers={userAnswers}
                handleChange={handleChange}
            />
            <Controllers
                questionsLength={data.questions.length}
                index={index}
                prevQuestion={prevQuestion}
                nextQuestion={nextQuestion}
            />
        </main>
    )
}

export default QuestionsPage;