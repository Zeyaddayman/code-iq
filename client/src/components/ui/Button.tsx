import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    className?: string
    width?: "full" | "fit"
}

const Button =  forwardRef<HTMLButtonElement, IProps>(({ children, className, width = "full", ...rest }, ref) => (
    <button
        className={`${className} w-${width} flex rounded-md justify-center text-white p-3 font-semibold`}
        ref={ref}
        {...rest}
    >
        {children}
    </button>
))

export default Button