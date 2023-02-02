import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface match {
    title: string | null,
}

interface matchListState {
    matchList: match[];
}

const initialState: matchListState = {
    matchList: [
        {
            title: "농구할 사람",
        }
    ]
}

const matchSlice = createSlice({
    name: "match",
    initialState,
    reducers: {
        addMatch(state, action) {
            state.matchList.push(action.payload);
        },
    }
})

export const {
    addMatch,
} = matchSlice.actions;

export default matchSlice.reducer;