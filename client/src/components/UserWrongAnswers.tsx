import { WrongAnsweredQuestion } from "../interfaces"

interface IProps {
    wrongAnsweredQuestions: WrongAnsweredQuestion[]
}

const UserWrongAnswers = ({ wrongAnsweredQuestions }: IProps) => {
    return (
        <section className="border-b border-secondary/30 py-10">
            <h2 className="font-bold text-xl md:text-3xl mb-10">Wrong Answers</h2>
            <ul className="space-y-5">
                {wrongAnsweredQuestions.map((question, i) => (
                    <li
                        key={question.title}
                        className="p-4 bg-white font-semibold rounded-md"
                    >
                        <h4 className="mb-2 text-xl">{i + 1}. {question.title}</h4>
                        <p className="text-red-600">Your Answer: {question.userAnswer}</p>
                        <p className="text-green-500">Correct Answer: {question.correctAnswer}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default UserWrongAnswers