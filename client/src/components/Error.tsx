import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom";

interface IProps {
    title: string;
    text: string;
}

const Error = ({ title, text }: IProps) => {
    return (
        <div className="grid h-full place-items-center place-content-center">
            <ExclamationTriangleIcon width={64} color="red" />
            <h2 className="mt-8 mb-5 text-2xl font-bold">{title}</h2>
            <p className="mb-5 text-center">{text}</p>
            <Link to={"/"} className="px-6 py-3 rounded-md bg-primary text-white font-semibold">
                Return to Home
            </Link>
        </div>
    )
}

export default Error