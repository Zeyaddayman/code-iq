import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IResult } from '../../interfaces';

const initialState: { prevResults: IResult[] } = {
    prevResults: JSON.parse(localStorage.getItem("prev-results") || "[]") || []
}

export const prevResultsSlice = createSlice({
    name: 'prevResults',
    initialState,
    reducers: {
        setPrevResults: (state, action: PayloadAction<IResult[]>) => {
            state.prevResults = action.payload
            localStorage.setItem("prev-results", JSON.stringify(action.payload))
        }
    },
})

export const { 
    setPrevResults
} = prevResultsSlice.actions;

export const selectPrevResults = (state: RootState) => state.prevResults;

export default prevResultsSlice.reducer;