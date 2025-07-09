import { ICategory } from "../interfaces"

export const WEBSITE_URL = "https://programming-quizz-app.netlify.app"

export const QUIZ_DURATION = 3 // minutes

export const RULES = [
    `You have a 10 random questions to solve in ${QUIZ_DURATION} minutes`,
    'Each question has three options, you can choose only one option.',
    'You can review and change answers before the quiz finish.',
    '10 points is awarded for the correct answer.',
    'The result will be declared at the end of the quiz.'
]

export const CATEGORIES: ICategory[] = [
    // {
    //     id: crypto.randomUUID(),
    //     name: "Java",
    //     slug: "java",
    // },
    {
        id: crypto.randomUUID(),
        name: "Python",
        slug: "python",
        icon: `images/python.png`
    },
    {
        id: crypto.randomUUID(),
        name: "Javascript",
        slug: "javascript",
        icon: `/images/js.png`
    },
    // {
    //     id: crypto.randomUUID(),
    //     name: "C++",
    //     slug: "c-plus-plus",
    //     icon: `${WEBSITE_URL}/images/cplusplus.png`
    // }
]

export const THEMES: {
    name: string;
    color: string;
}[] = [
    {
        name: "Blueberry",
        color: "#0b99ff"
    },
    {
        name: "Mint",
        color: "#00b09f"
    },
    {
        name: "Dark",
        color: "#242424"
    }
]