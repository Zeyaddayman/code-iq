import Button from "./ui/Button"

interface IProps {
    questionsLength: number;
    index: number;
    nextQuestion: () => void
    prevQuestion: () => void
}

const Controllers = ({ questionsLength, index, nextQuestion, prevQuestion }: IProps) => {
    const isFirstQuestion = index === 0;
    const isLastQuestion = index === questionsLength - 1;
    return (
        <div className="flex flex-1 items-end justify-between gap-5">
            <Button
                width="full"
                className={`${isFirstQuestion ? "invisible" : null} bg-[#e8e8e8] !text-gray-400`}
                onClick={prevQuestion}
            >
                Previous
            </Button>
            <Button
                width="full"
                className={`${isLastQuestion ? "bg-transparent outline outline-primary text-black" : "bg-primary"}`}
                onClick={nextQuestion}
            >
                {isLastQuestion ? "Finish" : "Next"}
            </Button>
        </div>
    )
}

export default Controllers