import { ButtonHTMLAttributes, ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    className?: string
    width?: "full" | "fit"
}

const Button = ({ children, className, width = "full", ...rest }: IProps) => {
    return (
        <button
            className={`${className} w-${width} flex rounded-md justify-center text-white p-3 hover:opacity-90 font-semibold`}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button