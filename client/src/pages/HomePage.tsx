import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CATEGORIES, RULES } from "../constants";
import SelectMenu from "../components/ui/SelectMenu";
import { useDispatch, useSelector } from "react-redux";
import { selectQuizInfo, setQuizCategory } from "../app/features/quizInfoSlice";
import { ICategory } from "../interfaces";
import ThemeSwitcher from "../components/ui/ThemeSwitcher";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <section>
            <header className="text-4xl font-bold mb-10 text-primary-color text-center">Code IQ</header>
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl mb-3 font-semibold">Quiz Rules</h3>
                    <ul className="flex flex-col gap-2">
                        {RULES.map((rule, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <CheckCircleIcon width={20} height={20} className="flex-shrink-0" /> {rule}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl mb-3 font-semibold">Select Theme</h3>
                    <ThemeSwitcher />
                </div>
                <div>
                    <SelectLanguageMenu />
                </div>
                <div>
                    <StartQuizButton />
                </div>
            </div>
        </section>
    )
}

const SelectLanguageMenu = () => {

    const { category } = useSelector(selectQuizInfo);
    const dispatch = useDispatch();

    const setSelectedQuizCategory = (category: ICategory) => {
        dispatch(setQuizCategory(category));
    }

    return (
        <SelectMenu
            title="Select Language"
            options={CATEGORIES}
            selected={category}
            setSelected={setSelectedQuizCategory}
        />
    )
}

const StartQuizButton = () => {
    const { category } = useSelector(selectQuizInfo);

    return (
        <Link
            to={`/questions?category=${category.slug}`}
            className="block w-full text-center bg-primary-color text-white px-6 py-4 rounded-md"
        >
            Start Quiz
        </Link>
    )
}

export default HomePage;