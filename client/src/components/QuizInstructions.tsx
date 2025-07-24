import Button from "./ui/Button"

interface IProps {
    triggerFullscreen: () => Promise<void>
}

const QuizInstructions = ({ triggerFullscreen }: IProps) => {
    return (
        <div>
            <h2 className="text-xl md:text-3xl text-center font-bold">📝 Quiz Instructions</h2>
            <div className="my-12 text-secondary font-semibold space-y-3">
                <p>✅ <strong>This quiz must be taken in fullscreen mode</strong></p>
                <p>🚫 <strong>Please don't switch tabs or windows during the quiz</strong></p>
                <p>🚫 <strong>Don't minimize or exit fullscreen mode</strong></p>
                <p>⚠️ <strong>Important: If you leave fullscreen, switch tabs, or open other window or app, your quiz will automatically end and your progress will be lost.</strong></p>
            </div>
            <Button onClick={triggerFullscreen} width="full" className="bg-primary">
                I Understand, Start Quiz
            </Button>
        </div>
    )
}

export default QuizInstructions