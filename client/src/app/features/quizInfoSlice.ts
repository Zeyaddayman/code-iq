import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICategory, IUserAnswers } from '../../interfaces';
import { RootState } from '../store';
import { categories } from '../../constants';

interface IQuizInfo {
    quizStarted: boolean;
    category: ICategory;
    userAnswers: IUserAnswers
}

const initialState: IQuizInfo = {
    quizStarted: false,
    category: JSON.parse(localStorage.getItem("quizCategory") || JSON.stringify(categories[0])) || categories[0],
    userAnswers: {}
}

export const quizInfoSlice = createSlice({
    name: 'quizInfo',
    initialState,
    reducers: {
        setQuizCategory: (state, action: PayloadAction<ICategory>) => {
            state.category = action.payload;
            localStorage.setItem("quizCategory", JSON.stringify(action.payload))
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
    setQuizCategory,
    setQuizStarted,
    setUserAnswers
    
} = quizInfoSlice.actions;

export const selectQuizInfo = (state: RootState) => state.quizInfo;

export default quizInfoSlice.reducer;