import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

interface userId {
    id: number;
}

const initialState: userId = {
    id: 0
}

const userIdSlice = createSlice({
    name: 'userId',
    initialState,
    reducers: {
        saveUserId(state, action) {
            state.id = action.payload
        },
    }
})

export const {
    saveUserId
} = userIdSlice.actions;

export default userIdSlice.reducer;