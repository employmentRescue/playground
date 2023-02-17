import { createSlice } from "@reduxjs/toolkit";

import { teamMatchList } from '@/models/teamMatchList';
import moment from "moment";

const initialState: teamMatchList = {
    matchDate: moment(new Date()).format('YYYY-MM-DD'),
    lat: 36.3561823752851,
    lng: 127.37279449758137,
    distance: 0,
    minStartTime: "00:00:00",
    maxStartTime: "24:00:00",
    sports: "농구",
    gameType: "3vs3",
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