import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

interface IProps {
    title: string;
    text: string;
}

const Error = ({ title, text }: IProps) => {
    return (
        <div className="grid h-full place-items-center place-content-center">
            <ExclamationTriangleIcon width={64} color="red" />
            <h2 className="mt-8 mb-5 text-2xl font-bold">{title}</h2>
            <p>{text}</p>
        </div>
    )
}

export default Error