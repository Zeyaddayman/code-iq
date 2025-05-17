import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IResult } from '../../interfaces';

const initialState: { results: IResult[] } = {
    results: JSON.parse(localStorage.getItem("results") || "[]") || []
}

export const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        setResults: (state, action: PayloadAction<IResult[]>) => {
            state.results = action.payload
            localStorage.setItem("results", JSON.stringify(action.payload))
        }
    },
})

export const { 
    setResults
} = resultsSlice.actions;

export const selectResults = (state: RootState) => state.results;

export default resultsSlice.reducer;