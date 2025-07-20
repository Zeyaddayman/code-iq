import { useEffect, useState } from "react";
import { LANGUAGES } from "../constants";
import { ILanguage, IQuestion } from "../interfaces";

interface IState {
    data: { questions: IQuestion[] | null, language: ILanguage | null };
    isError: boolean;
    errorMessage: string
}

export const useGetQuestionsByLanguage = (quizLanguage: string) => {

    const [state, setState] = useState<IState>({
        data: { questions: null, language: null },
        isError: false,
        errorMessage: "There was an issue loading the quiz questions. Please try again"
    });

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/questions?language=${quizLanguage}`)

                const data = await res.json()

                if (res.status === 200) {
                    const matchLanguage = LANGUAGES.find((lang) => lang.slug === data.language);

                    setState((prevState) => ({
                        ...prevState,
                        data: { questions: data.questions, language: matchLanguage! }
                    }));

                } else {
                    setState((prevState) => ({
                        ...prevState,
                        isError: true,
                        errorMessage: data.message
                    }));
                }

            } catch {
                setState((prevState) => ({
                    ...prevState,
                    isError: true,
                    errorMessage: "There was an issue loading the quiz questions. Please try again"
                }));
            }
        }

        fetchQuestions();

    }, [quizLanguage])

    return { questions: state.data.questions, language: state.data.language, isError: state.isError, errorMessage: state.errorMessage };
}