import { ILanguage } from "../interfaces"

export const QUIZ_DURATION = 3 // minutes
export const QUIZ_QUESTIONS_COUNT = 10
export const POINTS_PER_QUESTION = 10

export const RULES = [
    `You have a ${QUIZ_QUESTIONS_COUNT} random questions to solve in ${QUIZ_DURATION} minutes`,
    'Each question has three options, you can choose only one option.',
    'You can review and change answers before the quiz finish.',
    `${POINTS_PER_QUESTION} points is awarded for the correct answer.`,
    'The result will be declared at the end of the quiz.'
]

export const LANGUAGES: ILanguage[] = [
    {
        name: "Java",
        slug: "java",
        icon: `images/java.png`
    },
    {
        name: "Python",
        slug: "python",
        icon: `images/python.png`
    },
    {
        name: "Javascript",
        slug: "javascript",
        icon: `images/javascript.png`
    },
    {
        name: "C++",
        slug: "c-plus-plus",
        icon: `images/c-plus-plus.png`
    }
]

export const THEMES = [
    {
        name: "Blue",
        color: "#277eff"
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

export const DEFAULT_THEME_NAME: ThemeName = "Blue"