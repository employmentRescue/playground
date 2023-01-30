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
    liveList: [{
        type: "basketball",
        place: "고운뜰공원",
        detail: "안녕하세요",
        lat: 36.3563369,
        lng: 127.2991423,
        currentPeopleNum: 3,
        totalPeopleNum: 6,
        remainTime: 1523,
        userNickName: "이경택",
        userPicture: "userPicture",
    },
    {
        type: "soccer",
        place: "고운뜰공원",
        detail: "안녕하세요",
        lat: 36.3653369,
        lng: 127.2971423,
        currentPeopleNum: 1,
        totalPeopleNum: 6,
        remainTime: 1523,
        userNickName: "박진성",
        userPicture: "userPicture",
    },
    {
        type: "badminton",
        place: "고운뜰공원",
        detail: "안녕하세요",
        lat: 36.3663369,
        lng: 127.2961423,
        currentPeopleNum: 5,
        totalPeopleNum: 6,
        remainTime: 625,
        userNickName: "이강윤",
        userPicture: "userPicture",
    }]
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
    }
})

export const {
    addLiveMatch,
    clearAllLiveMatch
} = liveSlice.actions;

export default liveSlice.reducer;