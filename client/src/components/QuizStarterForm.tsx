import { FormEvent, useState } from "react";
import SelectMenu from "./ui/SelectMenu";
import { CATEGORIES } from "../constants";
import Button from "./ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectQuizInfo, setQuizCategory, setQuizStarted } from "../app/features/quizInfoSlice";
import { useNavigate } from "react-router";

const QuizStarterForm = () => {

    const { category: defaultCategory } = useSelector(selectQuizInfo);
    const [category, setCategory] = useState(defaultCategory);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startQuiz = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(setQuizCategory(category));
        dispatch(setQuizStarted(true));
    
        navigate(`/questions?category=${category.slug}`, {
            replace: true
        });
    }

    return (
        <form onSubmit={startQuiz}>
            <div className="mb-8">
                <SelectMenu title="choose category" options={CATEGORIES} selected={category} setSelected={setCategory} />
            </div>
            <Button className="bg-dark-blue-color px-6 mx-auto" width="fit">Start Quiz</Button>
        </form>
    )
}

export default QuizStarterForm;