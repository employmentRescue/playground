import { createSlice } from "@reduxjs/toolkit";

type Level = "입문" | "초수" | "중수" | "고수" | null

interface NicknameAction {
    payload: string
}
interface FavoriteTimeAction {
    payload: number | number[]
}
interface FavoriteSportsAction {
    payload: { sportName: "soccer" | "basketball" | "badminton" | null, isSelected: boolean }
}
interface SportsLevelAction {
    payload: { sportName: "soccer" | "basketball" | "badminton" | null, level: Level }
}

export interface User {
    nickname: string,
    favoriteTime?: number | number[],
    favoriteSports: {
        soccer: boolean,
        basketball: boolean,
        badminton: boolean,
    },
    sportsLevel: {
        soccer?: Level,
        basketball?: Level,
        badminton?: Level,
    },
}

const initialState: User = {
    nickname: "",
    favoriteTime: [6, 18],
    favoriteSports: {
        soccer: false,
        basketball: false,
        badminton: false,
    },
    sportsLevel: {
        soccer: null,
        basketball: null,
        badminton: null,
    },
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setNickname(state, action: NicknameAction) {
            console.log(action.payload)
            state.nickname = action.payload
        },
        setFavoriteTime(state, action: FavoriteTimeAction) {
            console.log(action.payload)
            state.favoriteTime = action.payload
        },
        setFavoriteSports(state, action: FavoriteSportsAction) {
            console.log(action.payload)
            switch(action.payload.sportName) {
                case "soccer":
                    state.favoriteSports.soccer = action.payload.isSelected
                    break;
                case "basketball":
                    state.favoriteSports.basketball = action.payload.isSelected
                    break;
                case "badminton":
                    state.favoriteSports.badminton = action.payload.isSelected
                    break;
            }
        },
        setSportsLevel(state, action: SportsLevelAction) {
            console.log(action.payload)
            switch(action.payload.sportName) {
                case "soccer":
                    state.sportsLevel.soccer = action.payload.level
                    break;
                case "basketball":
                    state.sportsLevel.basketball = action.payload.level
                    break;
                case "badminton":
                    state.sportsLevel.badminton = action.payload.level
                    break;
            }
        }
    }
})

export const {
    setNickname,
    setFavoriteTime,
    setFavoriteSports,
    setSportsLevel
} = userSlice.actions;

export default userSlice.reducer;