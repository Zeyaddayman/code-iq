import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { LANGUAGES, RULES } from "../constants";
import SelectMenu from "../components/ui/SelectMenu";
import { useDispatch, useSelector } from "react-redux";
import { selectQuizInfo, setQuizLanguage } from "../app/features/quizInfoSlice";
import { ILanguage } from "../interfaces";
import ThemeSwitcher from "../components/ui/ThemeSwitcher";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <header className="text-4xl font-bold mb-10 text-primary-color text-center">Code IQ</header>
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl mb-3 font-semibold">Quiz Rules</h3>
                    <ul className="flex flex-col gap-2">
                        {RULES.map((rule, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <CheckCircleIcon width={20} height={20} className="flex-shrink-0 text-primary-color" /> {rule}
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
        </>
    )
}

const SelectLanguageMenu = () => {

    const { language } = useSelector(selectQuizInfo);
    const dispatch = useDispatch();

    const setSelectedQuizLanguage = (language: ILanguage) => {
        dispatch(setQuizLanguage(language));
    }

    return (
        <SelectMenu
            title="Select Language"
            options={LANGUAGES}
            selected={language}
            setSelected={setSelectedQuizLanguage}
        />
    )
}

const StartQuizButton = () => {
    const { language } = useSelector(selectQuizInfo);

    return (
        <Link
            to={`/questions?language=${language.slug}`}
            className="block w-full text-center bg-primary-color text-white px-6 py-4 rounded-md"
        >
            Start Quiz
        </Link>
    )
}

export default HomePage;