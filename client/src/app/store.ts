import { configureStore } from '@reduxjs/toolkit'
import quizInfoReducer from './features/quizInfoSlice'
import prevResultsReducer from './features/prevResultsSlice'

export const store = configureStore({
    reducer: {
        quizInfo: quizInfoReducer,
        prevResults: prevResultsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch