import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ILanguage, IUserAnswers } from '../../interfaces';
import { RootState } from '../store';
import { LANGUAGES } from '../../constants';

interface IQuizInfo {
    quizStarted: boolean;
    language: ILanguage;
    userAnswers: IUserAnswers
}

const initialState: IQuizInfo = {
    quizStarted: false,
    language: JSON.parse(localStorage.getItem("quiz-language") || JSON.stringify(LANGUAGES[0])) || LANGUAGES[0],
    userAnswers: {}
}

export const quizInfoSlice = createSlice({
    name: 'quizInfo',
    initialState,
    reducers: {
        setQuizLanguage: (state, action: PayloadAction<ILanguage>) => {
            state.language = action.payload;
            localStorage.setItem("quiz-language", JSON.stringify(action.payload))
        },
        setQuizStarted: (state, action: PayloadAction<boolean>) => {
            state.quizStarted = action.payload;
        },
        setUserAnswers: (state, action: PayloadAction<IUserAnswers>) => {
            state.userAnswers = action.payload;
        }
    },
})

export const { 
    setQuizLanguage,
    setQuizStarted,
    setUserAnswers
    
} = quizInfoSlice.actions;

export const selectQuizInfo = (state: RootState) => state.quizInfo;

export default quizInfoSlice.reducer;