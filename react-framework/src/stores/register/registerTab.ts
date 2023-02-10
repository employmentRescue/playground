import { createSlice } from "@reduxjs/toolkit";

interface TabState {
    currentIndex: 0 | 1 | 2;
}

const initialState: TabState = {
    currentIndex: 0
}

const registerTabSlice = createSlice({
    name: "registerTab",
    initialState,
    reducers: {
        activeIndex(state, action) {
            state.currentIndex = action.payload;
        },
    }
})

export const {
    activeIndex
} = registerTabSlice.actions;

export default registerTabSlice.reducer;