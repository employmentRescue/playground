import { createSlice } from "@reduxjs/toolkit";

interface tabName {
  name: string
}

const initialState: tabName = {
  name: 'playGround'
}

const tabNameSlice = createSlice({
  name: "tabName",
  initialState,
  reducers: {
    setTabName(state, action) {
      state.name = action.payload;
    },
  }
})

export const {
  setTabName,
} = tabNameSlice.actions;

export default tabNameSlice.reducer;