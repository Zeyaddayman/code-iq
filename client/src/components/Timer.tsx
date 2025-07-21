import { useEffect, useState } from "react"
import { formatTime } from "../utils"

interface IProps {
    quizDurationSeconds: number
    finishQuiz: () => void
}

const Timer = ({ quizDurationSeconds, finishQuiz }: IProps) => {

    const [timer, setTimer] = useState(quizDurationSeconds)

    const remainingPercentage = timer / quizDurationSeconds * 100

    const time = formatTime(timer)

    useEffect(() => {

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 0) {
                    clearInterval(interval)
                    finishQuiz()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => {
            clearInterval(interval)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className="w-20 h-20 rounded-full relative"
            style={{
                background: `conic-gradient(rgb(var(--primary)) ${remainingPercentage}%, rgb(var(--primary)/0.5) 0%)`
            }}
        >
            <span
                className="absolute top-1/2 left-1/2 w-16 h-16 bg-background text-secondary font-semibold grid place-items-center rounded-full -translate-x-1/2 -translate-y-1/2"
            >
                {time}
            </span>
        </div>
    )
}

export default Timer