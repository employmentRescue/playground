import { createSlice} from "@reduxjs/toolkit";

interface matchId {
  id: number;
}

const initialState: matchId = {
  id: 0,
}

const matchIdSlice = createSlice({
    name: "matchId",
    initialState,
    reducers: {
        setMatchId(state, action) {
        state.id = action.payload;
        },
    }
})

export const {
    setMatchId,
} = matchIdSlice.actions;

export default matchIdSlice.reducer;