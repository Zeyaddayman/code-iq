import { useEffect, useState } from "react";
import { formatTime } from "../utils";

interface IProps {
    quizTime: number;
    finishQuiz: () => void;
}

const CountDown = ({ quizTime, finishQuiz }: IProps) => {

    const [countdown, setCountdown] = useState(quizTime * 60); // seconds

    const time = formatTime(countdown);

    useEffect(() => {

        if (countdown <= 0) finishQuiz();
        else {
            setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown])

    return (
        <div>
            Time Left &ensp; <span className="text-secondary-color">{time}</span>
        </div>
    )
}

export default CountDown;