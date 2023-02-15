import { createSlice } from "@reduxjs/toolkit";

import { matchList } from '@/models/matchList';
import moment from "moment";

const initialState: matchList = {
    startDate: moment(new Date()).format('YYYY-MM-DD'),
    lat: 36.3561823752851,
    lng: 127.37279449758137,
    distance: 0,
    minStartTime: "00:00:00",
    maxStartTime: "24:00:00",
    level: "중수",
    minPlayTime: 1, // Number(dayjs(new Date()).format('H')),
    maxPlayTime: 24, // Number(dayjs(new Date()).format('H')) + 2,
    sex: "남성",
    sports: "농구",
    gameType: "3vs3",
    sort: "distance"
}

const sortInfoSlice = createSlice({
    name: "sortInfo",
    initialState,
    reducers: {
        setSortDate(state, action) {
            state.startDate = action.payload;
        },
        setSortLocation(state, action) {
            [state.lat, state.lng] = action.payload;
        },
        setSortDistance(state, action) {
            state.distance = action.payload;
        },
        setSortStartTime(state, action) {
            [state.minStartTime, state.maxStartTime] = action.payload;
        },
        setSortlevel(state, action) {
            state.level = action.payload;
        },
        setSortPlayTime(state, action) {
            [state.minPlayTime, state.maxPlayTime] = action.payload;
        },
        setSortSex(state, action) {
            state.sex = action.payload;
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
    setSortlevel,
    setSortPlayTime,
    setSortSex,
    setSortSports,
    setSortGameType,
    setSortSort,
} = sortInfoSlice.actions;

export default sortInfoSlice.reducer