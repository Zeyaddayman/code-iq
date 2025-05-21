import QuizStarterForm from "../components/QuizStarterForm";
import { RULES } from "../constants";

const HomePage = () => {
    return (
        <main>
            <ul className="flex flex-col gap-3 mb-5">
                {RULES.map((rule, i) => (
                    <li key={i}>{`${i + 1}: ${rule}`}</li>
                ))}
            </ul>
            <QuizStarterForm />
        </main>
    )
}

export default HomePage;