import { IQuestion, IUserAnswers } from "../interfaces"

interface IProps {
    question: IQuestion
    userAnswers: IUserAnswers
    handleChange: (id: string, answer: string) => void
}

const Question = ({ question, userAnswers, handleChange }: IProps) => {
    return (
        <section className="select-none">
            <h2 className="text-2xl mb-8 text-center font-semibold">{question.title}</h2>
            <ul className="flex flex-col gap-3 mb-10">
                {question.answers.map((answer) => (
                    <div
                        key={answer}
                    >
                        <input
                            type="radio"
                            className="sr-only peer"
                            id={answer}
                            checked={userAnswers[question.id] === answer}
                            onChange={() => handleChange(question.id, answer)}
                        />
                        <label
                            htmlFor={answer}
                            className="p-4 rounded-md block shadow-sm bg-white peer-checked:bg-primary peer-checked:text-white ring-2 ring-transparent hover:ring-primary peer-focus-visible:ring-primary transition cursor-pointer"
                        >
                            {answer}
                        </label>
                    </div>
                ))}
            </ul>
        </section>
    )
}

export default Question