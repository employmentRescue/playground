import { createSlice } from "@reduxjs/toolkit";

interface live {
    type: string,
    place: string,
    detail: string,
    lat: number,
    lng: number,
    currentPeopleNum: number,
    totalPeopleNum: number,
    remainTime: number,
    userNickName: string,
    userPicture: string,
}

interface liveListState {
    liveList: live[];
}

const initialState: liveListState = {
    liveList: []
}

const liveSlice = createSlice({
    name: "live",
    initialState,
    reducers: {
        addLiveMatch(state, action) {
            state.liveList.push(action.payload);
        },
        clearAllLiveMatch(state, action) {
            state.liveList = [];
        }
    },
})

export const {
    addLiveMatch,
    clearAllLiveMatch
} = liveSlice.actions;

export default liveSlice.reducer;