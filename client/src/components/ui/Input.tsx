import { forwardRef, InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {

    const { className, ...rest }: IProps = props

    return (
        <input
            ref={ref}
            className={`${className} border-[1px] border-soft-while-color
                shadow-md focus:border-secondary-color focus:outline-none
                focus:ring-1 focus:ring-secondary-color rounded
                p-3 text-md`}
            {...rest}
        />
    )
})

export default Input