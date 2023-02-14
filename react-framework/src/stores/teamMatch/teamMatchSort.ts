import { createSlice} from "@reduxjs/toolkit";

import { teamMatchList } from '@/models/teamMatchList';

const initialState: teamMatchList = {
    matchDate: "2023-02-14",
    lat: 36.3561823752851,
    lng: 127.37279449758137,
    distance: 100,
    minStartTime: "01:00:00",
    maxStartTime: "23:00:00",
    sports: "농구",
    gameType: "5vs5",
    sort: "distance"
}

const sortInfoSlice = createSlice({
    name: "sortInfo",
    initialState,
    reducers: {
        setSortDate(state, action) {
            state.matchDate = action.payload;
        },
        setSortLocation(state, action) {
            state.lat, state.lng = action.payload;
        },
        setSortDistance(state, action) {
            state.distance = action.payload;
        },
        setSortStartTime(state, action) {
            state.minStartTime, state.maxStartTime = action.payload;
        },
        setSortSports(state, action) {
            state.sports = action.payload;
        },
        setSortGameType(state, action) {
            state.gameType = action.payload;
        },
        setSortSort(state, action) {
            state.sort = action.payload;
        },
    }

})

export const {
    setSortDate,
    setSortLocation,
    setSortDistance,
    setSortStartTime,
    setSortSports,
    setSortGameType,
    setSortSort,
} = sortInfoSlice.actions;

export default sortInfoSlice.reducer