export interface IQuestion {
    id: string
    title: string
    answers: string[]
    language: string
}
export interface ILanguage {
    name: string
    slug: string
    icon?: string
}

export type ISelectMenuOption = ILanguage

export type IUserAnswers = { [id: string]: string }

export interface IResult {
    date: Date
    language: string
    attempts: number
    questions: number
    quizPoints: number
    earnedPoints: number
    percentage: number
    isPassed: boolean
    wrongAnsweredQuestions: wrongAnsweredQuestion[]
}

export type wrongAnsweredQuestion = {
    title: string
    userAnswer: string
    correctAnswer: string
}