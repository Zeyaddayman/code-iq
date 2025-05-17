import Button from "./ui/Button"

interface IProps {
    questionsLength: number;
    index: number;
    nextQuestion: () => void
    prevQuestion: () => void
}

const Controllers = ({ questionsLength, index, nextQuestion, prevQuestion }: IProps) => {
    return (
        <div className="flex justify-between">
            <Button
                width="fit"
                className={`${index === 0 ? "invisible" : null} bg-secondary-color px-6`}
                onClick={prevQuestion}
            >
                Prev
            </Button>
            <Button
                width="fit"
                className={`${index !== questionsLength - 1 ? "bg-secondary-color" : "bg-primary-color"} px-6`}
                onClick={nextQuestion}
            >
                {index !== questionsLength - 1 ? "Next" : "Finish"}
            </Button>
        </div>
    )
}

export default Controllers