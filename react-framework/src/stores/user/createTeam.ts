import profileSampleImg from "@/assets/profiles/my-profile-sample.png"
import profileSampleImg2 from "@/assets/profiles/my-profile-sample2.png"
import profileSampleImg3 from "@/assets/profiles/my-profile-sample3.png"
import profileSampleImg4 from "@/assets/profiles/my-profile-sample4.png"
import profileSampleImg5 from "@/assets/profiles/my-profile-sample5.png"

import { createSlice } from "@reduxjs/toolkit";

interface SampleUser {
    userId: number;
    imageSrc: string;
    nickname: string;
    isSelected: boolean;
    isRecent: boolean;
}

interface SampleUserAction {
    payload: SampleUser
}

interface toggleIsSelectedAction {
    payload: { userId: number, isSelected: boolean }
}

const initialState: SampleUser[] = [
    {
        userId: 1,
        imageSrc: profileSampleImg2,
        nickname: "포르투갈 손흥민",
        isSelected: false,
        isRecent: true
    },
    {
        userId: 2,
        imageSrc: profileSampleImg3,
        nickname: "한반두",
        isSelected: false,
        isRecent: true
    },
    {
        userId: 3,
        imageSrc: profileSampleImg4,
        nickname: "얼굴 천재",
        isSelected: false,
        isRecent: true
    },
    {
        userId: 4,
        imageSrc: profileSampleImg5,
        nickname: "회사원",
        isSelected: false,
        isRecent: true
    },
    {
        userId: 5,
        imageSrc: profileSampleImg2,
        nickname: "친구1",
        isSelected: false,
        isRecent: false
    },
    {
        userId: 6,
        imageSrc: profileSampleImg3,
        nickname: "친구2",
        isSelected: false,
        isRecent: false
    },
]

const createTeamSlice = createSlice({
    name: 'sampleUser',
    initialState,
    reducers: {
        saveSampleUser(state, action: SampleUserAction) {
            state.push(action.payload)
        },
        toggleIsSelected(state, action: toggleIsSelectedAction) {
            state.map((user) => {
                if (user.userId === action.payload.userId) {
                    return { ...user, isSelected: action.payload.isSelected }
                }
            })
        }
    }
})

export const {
    saveSampleUser,
    toggleIsSelected,
} = createTeamSlice.actions;

export default createTeamSlice.reducer;