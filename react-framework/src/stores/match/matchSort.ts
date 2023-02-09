import { createSlice} from "@reduxjs/toolkit";

import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

interface sortInfo {
    sportType: string,
    distance: number,
    date: string,
    timeRange: number[] | null,
}

const initialState: sortInfo = {
    sportType: 'BASKETBALL',
    distance: 1,
    date: dayjs(new Date()).format('YYYY-MM-DD'),
    timeRange: null,
}

const sortInfoSlice = createSlice({
    name: "sortInfo",
    initialState,
    reducers: {
        setSortSportType(state, action) {
            state.sportType = action.payload;
        },
        setSortDistance(state, action) {
            state.distance = action.payload;
        },
        setSortDate(state, action) {
            state.date = action.payload;
        },
        setSortTimeRange(state, action) {
            state.timeRange = action.payload;
        }
    }

})

export const {
    setSortSportType,
    setSortDistance,
    setSortDate,
    setSortTimeRange
} = sortInfoSlice.actions;

export default sortInfoSlice.reducer