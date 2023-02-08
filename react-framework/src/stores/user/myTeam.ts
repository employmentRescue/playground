import { createSlice } from "@reduxjs/toolkit";

export interface MyTeam {
    myTeamName: string;
    memberIds: number[]
}

interface SetMyTeamNameAction {
    payload: string
}
interface InviteToMyTeamAction {
    payload: number
}
interface DropOutOfMyTeamAction {
    payload: number
}

const initialState: MyTeam = {
    myTeamName: "",
    memberIds: []
}

const myTeamSlice = createSlice({
    name: 'myTeam',
    initialState,
    reducers: {
        setMyTeamName(state, action: SetMyTeamNameAction) {
            state.myTeamName = action.payload
        },
        inviteToMyTeam(state, action: InviteToMyTeamAction) {
            // console.log(state.memberIds)
            state.memberIds.push(action.payload)
        },
        dropOutOfMyTeam(state, action: DropOutOfMyTeamAction) {
            // console.log(state.memberIds)
            state.memberIds = []
        },
    }
})

export const {
    setMyTeamName,
    inviteToMyTeam,
    dropOutOfMyTeam
} = myTeamSlice.actions;

export default myTeamSlice.reducer;