import { ILanguage } from "../interfaces"

export const QUIZ_DURATION = 3 // minutes

export const RULES = [
    `You have a 10 random questions to solve in ${QUIZ_DURATION} minutes`,
    'Each question has three options, you can choose only one option.',
    'You can review and change answers before the quiz finish.',
    '10 points is awarded for the correct answer.',
    'The result will be declared at the end of the quiz.'
]

export const LANGUAGES: ILanguage[] = [
    // {
    //     name: "Java",
    //     slug: "java",
    // },
    {
        name: "Python",
        slug: "python",
        icon: `images/python.png`
    },
    {
        name: "Javascript",
        slug: "javascript",
        icon: `images/js.png`
    },
    {
        name: "C++",
        slug: "c-plus-plus",
        icon: `images/cplusplus.png`
    }
]

export const THEMES = [
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
] as const

export type ThemeName = typeof THEMES[number]["name"]

export const DEFAULT_THEME_NAME: ThemeName = "Blueberry"