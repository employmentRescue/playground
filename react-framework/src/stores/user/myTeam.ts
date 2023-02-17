import { createSlice } from "@reduxjs/toolkit";

interface SampleUser {
    id: number;
    imageSrc: string;
    nickname: string;
    isSelected: boolean;
    isRecent: boolean;
}

interface InviteToMyTeamAction {
    payload: SampleUser
}
interface DropOutOfMyTeamAction {
    payload: SampleUser
}

const initialState: SampleUser[] = [
    {
        id: 0,
        imageSrc: "",
        nickname: "",
        isSelected: false,
        isRecent: false,
    }
]


const myTeamSlice = createSlice({
    name: 'myTeam',
    initialState,
    reducers: {
        inviteToMyTeam(state, action: InviteToMyTeamAction) {
            state.push(action.payload)
        },
        dropOutOfMyTeam(state, action: DropOutOfMyTeamAction) {
            return state.filter((oldState) => {
                return ((oldState.isSelected === action.payload.isSelected) ? oldState : action.payload)
            })
        },
    }
})

export const {
    inviteToMyTeam,
    dropOutOfMyTeam
} = myTeamSlice.actions;

export default myTeamSlice.reducer;