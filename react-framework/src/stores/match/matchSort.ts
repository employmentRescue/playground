import { createSlice} from "@reduxjs/toolkit";

import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

// 개인 매칭 목록 정렬
const favoriteTime = useSelector((state: RootState) => {
    return state.userInfo.favoriteTime;
});

interface sortInfo {
    sportType: string,
    distance: number,
    date: string,
    timeRange: number[],
}

const initialState: sortInfo = {
    sportType: 'BASKETBALL',
    distance: 1,
    date: dayjs(new Date()).format('YYYY-MM-DD'),
    timeRange: favoriteTime,
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