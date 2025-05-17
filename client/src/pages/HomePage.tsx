import QuizStarterForm from "../components/QuizStarterForm";
import { rules } from "../constants";

const HomePage = () => {
    return (
        <main>
            <ul className="flex flex-col gap-3 mb-5">
                {rules.map((rule, i) => (
                    <li key={i}>{`${i + 1}: ${rule}`}</li>
                ))}
            </ul>
            <QuizStarterForm />
        </main>
    )
}

export default HomePage;