export interface IQuestion {
    id: string;
    title: string;
    answers: string[];
    language: string;
}
export interface ISelectMenuOption {
    name: string;
    slug: string;
    icon?: string;
}

export type ILanguage = ISelectMenuOption

export interface IUserAnswers { [id: string]: string }

export interface IResult {
    date: Date;
    languageName: string;
    attempts: number;
    questions: number;
    quizPoints: number;
    earnedPoints: number;
    percentage: number;
    isPassed: boolean;
}