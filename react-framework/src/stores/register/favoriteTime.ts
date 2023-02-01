import { createSlice} from "@reduxjs/toolkit";

type TimeState = number[];

const initialState: TimeState = [0, 0]

const favoriteTimeSlice = createSlice({
    name: "favoriteSports",
    initialState,
    reducers: {
        getFavoriteSports(state, action) {
            return action.payload
        },
    }
})

export const {
    getFavoriteSports,
} = favoriteTimeSlice.actions;

export default favoriteTimeSlice.reducer;