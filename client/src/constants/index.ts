import { ICategory } from "../interfaces"

export const rules = [
    'You have a 10 random questions to solve in 5 minutes',
    'Each question has three options, you can choose only one option.',
    'You can review and change answers before the quiz finish.',
    '10 points is awarded for the correct answer.',
    'The result will be declared at the end of the quiz.'
]

export const categories: ICategory[] = [
    // {
    //     id: crypto.randomUUID(),
    //     name: "Java",
    //     slug: "java",
    // },
    {
        id: crypto.randomUUID(),
        name: "Python",
        slug: "python",
        icon: "http://localhost:5173/images/python.png"
    },
    {
        id: crypto.randomUUID(),
        name: "Javascript",
        slug: "javascript",
        icon: "http://localhost:5173/images/js.png"
    },
    // {
    //     id: crypto.randomUUID(),
    //     name: "C++",
    //     slug: "c-plus-plus",
    //     icon: "http://localhost:5173/images/cplusplus.png"
    // }
]