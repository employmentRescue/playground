import { createSlice } from "@reduxjs/toolkit";

export interface Chatting {
   userProfile: { userId: number, profilePath : string }[],
   userNickname: { userId: number, nickname: string }[],
}

const initialState: Chatting = {
    userProfile: [
        { userId: 0, profilePath: "https://cdn2.thecatapi.com/images/c31.jpg" },
        { userId: 1, profilePath: "https://cdn2.thecatapi.com/images/c31.jpg" },
        { userId: 2, profilePath: "https://cdn2.thecatapi.com/images/c31.jpg" }
    ],
    userNickname: [
        { userId: 0, nickname: "닉네임1" },
        { userId: 1, nickname: "닉네임2" },
        { userId: 2, nickname: "닉네임3" }
    ],
}

const chattingSlice = createSlice({
    name: "chatting",
    initialState,
    reducers: {
        // 리듀서 작성
    }
})

export const {
   
} = chattingSlice.actions;

export default chattingSlice.reducer;