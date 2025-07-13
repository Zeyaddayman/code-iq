import Button from "./ui/Button"

interface IProps {
    questionsLength: number;
    index: number;
    nextQuestion: () => void
    prevQuestion: () => void
}

const Controllers = ({ questionsLength, index, nextQuestion, prevQuestion }: IProps) => {
    return (
        <div className="flex flex-1 items-end justify-between gap-5">
            <Button
                width="full"
                className={`${index === 0 ? "invisible" : null} bg-[#e8e8e8] !text-gray-400`}
                onClick={prevQuestion}
            >
                Previous
            </Button>
            <Button
                width="full"
                className={`bg-primary`}
                onClick={nextQuestion}
            >
                {index !== questionsLength - 1 ? "Next" : "Finish"}
            </Button>
        </div>
    )
}

export default Controllers