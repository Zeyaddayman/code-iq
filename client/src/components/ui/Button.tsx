import { ButtonHTMLAttributes, ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    width?: "full" | "fit";
}

const Button = ({ children, className, width = "full", ...rest }: IProps) => {
    return (
        <button
            className={`${className} flex rounded text-white p-3 hover:opacity-75 w-${width}`}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button