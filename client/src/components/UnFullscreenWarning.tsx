import Button from "./ui/Button";

interface IProps {
    triggerFullscreen: () => Promise<void>;
}

const UnFullscreenWarning = ({ triggerFullscreen }: IProps) => {
    return (
        <div>
            <h2 className="text-xl md:text-3xl text-center font-bold">Important Quiz Information</h2>
            <p className="my-12 max-w-[600px] mx-auto text-secondary font-semibold">
                This quiz requires fullscreen mode for and uninterrupted experience if you exit fullscreen during the quiz, the quiz will end immediately, and your progress will be lost.
            </p>
            <Button onClick={triggerFullscreen} width="full" className="bg-primary">
                I Understand, Start Quiz
            </Button>
        </div>
    )
}

export default UnFullscreenWarning