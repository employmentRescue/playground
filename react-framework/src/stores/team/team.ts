import { createSlice } from "@reduxjs/toolkit";

interface teamId {
  id: number;
}

const initialState: teamId = {
  id: 1,
}

const teamIdSlice = createSlice({
  name: "teamId",
  initialState,
  reducers: {
    setTeamId(state, action) {
      state.id = action.payload;
    },
  }
})

export const {
  setTeamId,
} = teamIdSlice.actions;

export default teamIdSlice.reducer;