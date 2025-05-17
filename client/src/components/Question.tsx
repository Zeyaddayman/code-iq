import { IQuestion, IUserAnswers } from "../interfaces";

interface IProps {
    question: IQuestion;
    userAnswers: IUserAnswers
    handleChange: (id: string, answer: string) => void;
}

const Question = ({ question, userAnswers, handleChange }: IProps) => {
    return (
        <>
            <h2 className="text-xl mb-8">{question.title}</h2>
            <ul className="flex flex-col gap-2 mb-8">
                {question.answers.map((answer) => (
                    <label
                        key={answer}
                        htmlFor={answer}
                        className="group py-6 rounded relative pl-12 cursor-pointer transition duration-200 hover:text-dark-blue-color border-b-[1px] border-gray-400"
                    >
                        <input
                            type="radio"
                            className="peer appearance-none"
                            id={answer}
                            checked={userAnswers[question.id] === answer}
                            onChange={() => handleChange(question.id, answer)}
                        />
                        <span className="absolute bg-dark-blue-color w-5 h-5 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 left-1.5 top-1/2 -translate-y-1/2"></span>
                        <span className="absolute bg-transparent border-2 border-black w-8 h-8 rounded-full peer-checked:border-dark-blue-color group-hover:border-dark-blue-color transition duration-200 left-0 top-1/2 -translate-y-1/2"></span>
                        <label htmlFor={answer} className="peer-checked:text-dark-blue-color cursor-pointer">
                            {answer}
                        </label>
                    </label>
                ))}
            </ul>
        </>
    )
}

export default Question