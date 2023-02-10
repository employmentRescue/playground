import { createSlice} from "@reduxjs/toolkit";

import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { matchList } from '@/models/matchList';

const initialState: matchList = {
    startDate: "2023-02-14", // dayjs(new Date()).format('YYYY-MM-DD'),
    lat: 36.3561823752851,
    lng: 127.37279449758137,
    distance: 100,
    minStartTime: "01:00:00",
    maxStartTime: "23:00:00",
    level: "중수",
    minPlayTime: 1, // Number(dayjs(new Date()).format('H')),
    maxPlayTime: 23, // Number(dayjs(new Date()).format('H')) + 2,
    sex: "남성",
    sports: "농구",
    gameType: "5대5",
    sort: "distance"
}

const sortInfoSlice = createSlice({
    name: "sortInfo",
    initialState,
    reducers: {
        setSortSports(state, action) {
            state.sports = action.payload;
        },
        setSortDistance(state, action) {
            state.distance = action.payload;
        },
        setSortDate(state, action) {
            state.startDate = action.payload;
        },
        setSortTimeRange(state, action) {
            state.minStartTime,  state.maxStartTime = String(action.payload[0]), String(action.payload[1]);
        }
    }

})

export const {
    setSortSports,
    setSortDistance,
    setSortDate,
    setSortTimeRange
} = sortInfoSlice.actions;

export default sortInfoSlice.reducer