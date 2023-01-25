import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface live {
    title: string | null,
}

interface liveListState {
    liveList: live[];
}

const initialState: liveListState = {
    liveList: [
        {
            title: "농구할 사람",
        }
    ]
}

const liveSlice = createSlice({
    name: "match",
    initialState,
    reducers: {
        addMatch(state, action) {
            state.liveList.push(action.payload);
        },
    }
})

export const {
    addMatch,
} = liveSlice.actions;

export default liveSlice.reducer;