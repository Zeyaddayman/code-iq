import { configureStore } from '@reduxjs/toolkit'
import quizInfoReducer from './features/quizInfoSlice'
import resultsReducer from './features/resultsSlice'

export const store = configureStore({
    reducer: {
        quizInfo: quizInfoReducer,
        results: resultsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch