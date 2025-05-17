export interface IQuestion {
    id: string;
    title: string;
    answers: string[];
    category: string
}

export interface ICategory {
    id: string;
    name: string;
    slug: string;
    icon?: string;
}

export interface ISelectMenuOption {
    id: string;
    name: string;
    slug: string;
    icon?: string;
}

export interface IUserAnswers { [id: string]: string }

export interface IResult {
    date: Date;
    categoryName: string;
    attempts: number;
    questions: number;
    quizPoints: number;
    earnedPoints: number;
    percentage: number;
    isPassed: boolean
}