import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface matchListState {
    match: matchState | null,
}

interface matchState {
    title: string | null,
}

const initialState: matchListState = {
    match: {
        title: "농구할 사람",
    }
}

const matchSlice = createSlice({
    name: "match",
    initialState,
    reducers: {
        setMatch(state, action) {
            state.match = action.payload;
        },
    }
})

export const {
    setMatch,
} = matchSlice.actions;

export default matchSlice.reducer;