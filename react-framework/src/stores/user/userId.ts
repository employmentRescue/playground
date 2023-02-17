import { createSlice } from "@reduxjs/toolkit";

export type UserId = number

const initialState: UserId = 222

const userIdSlice = createSlice({
    name: 'userId',
    initialState,
    reducers: {
        saveUserId(state, action) {
            state = action.payload
        },
    }
})

export const {
    saveUserId
} = userIdSlice.actions;

export default userIdSlice.reducer;