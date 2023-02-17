import { createSlice } from "@reduxjs/toolkit";

interface teamMatchId {
  id: number;
}

const initialState: teamMatchId = {
  id: 1,
}

const teamMatchIdSlice = createSlice({
  name: "teamMatchId",
  initialState,
  reducers: {
    setTeamMatchId(state, action) {
      state.id = action.payload;
    },
  }
})

export const {
  setTeamMatchId,
} = teamMatchIdSlice.actions;

export default teamMatchIdSlice.reducer;