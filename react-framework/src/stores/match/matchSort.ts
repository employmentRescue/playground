import { createSlice} from "@reduxjs/toolkit";

import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { matchList } from '@/models/matchList';

const initialState: matchList = {
    startDate: dayjs(new Date()).format('YYYY-MM-DD'),
    lat: 36.3515058,
    lng: 127.3129497,
    distance: 10,
    minStartTime: null,
    maxStartTime: null,
    level: "중수",
    minPlayTime: 1,
    maxPlayTime: 3,
    sex: "남성",
    sports: "basketball",
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