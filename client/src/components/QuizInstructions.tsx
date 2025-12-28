import Button from "./ui/Button"

interface IProps {
    triggerFullscreen: () => Promise<void>
}

const QuizInstructions = ({ triggerFullscreen }: IProps) => {
    return (
        <div>
            <h2 className="text-2xl md:text-3xl text-center font-bold">📝 Quiz Instructions</h2>
            <div className="my-12 text-secondary font-semibold space-y-4">
                <ul className="space-y-2">
                    <li>✅ Must be taken in fullscreen mode</li>
                    <li>🚫 Do not switch tabs or windows</li>
                    <li>🚫 Do not exit fullscreen</li>
                </ul>
                <p className="text-sm border-t pt-4">
                    ⚠️ <strong>Warning:</strong> Leaving fullscreen or switching tabs will end the quiz immediately and lose all progress.
                </p>
            </div>
            <Button onClick={triggerFullscreen} width="full" className="bg-primary">
                I Understand, Start Quiz
            </Button>
        </div>
    )
}

export default QuizInstructions