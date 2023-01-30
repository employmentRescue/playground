import { createSlice } from "@reduxjs/toolkit";

interface live {
    place: string,
    detail: string,
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
    }
})

export const {
    addLiveMatch,
} = liveSlice.actions;

export default liveSlice.reducer;