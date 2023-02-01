import { createSlice} from "@reduxjs/toolkit";

// interface SportsState {
//     myFavoriteSports: String[];
// }

// const initialState: SportsState = {
//     myFavoriteSports: []
// }

type SportsState = Array<{isSelected: Boolean, sportName: String}>;

const initialState: SportsState = [
    {
        isSelected: false,
        sportName: "soccer"
    },
    {
        isSelected: false,
        sportName: "basketball"
    },
    {
        isSelected: false,
        sportName: "badminton"
    },
];

const favoriteSportsSlice = createSlice({
    name: "favoriteSports",
    initialState,
    reducers: {
        getFavoriteSports(state, action) {
            console.log(action.payload)
            switch(action.payload.sportName) {
                case "soccer":
                    console.log("soccer")
                    state[0].isSelected = action.payload.isSelected
                    break;
                case "basketball":
                    console.log("basketball")
                    state[1].isSelected = action.payload.isSelected
                    break;
                case "badminton":
                    console.log("badminton")
                    state[2].isSelected = action.payload.isSelected
                    break;
            }
        },
    }
})

export const {
    getFavoriteSports,
} = favoriteSportsSlice.actions;

export default favoriteSportsSlice.reducer;