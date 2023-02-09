import { createSlice } from "@reduxjs/toolkit";

export interface MyTeam {
    sportsType: "축구" | "농구" | "배드민턴";
    myTeamName: string;
    memberIds: number[]
}

interface SetSportsTypeAction {
    payload: "축구" | "농구" | "배드민턴"
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
    sportsType: "축구",
    myTeamName: "",
    memberIds: []
}


const myTeamSlice = createSlice({
    name: 'myTeam',
    initialState,
    reducers: {
        setSportsType(state, action: SetSportsTypeAction) {
            state.sportsType = action.payload
        },
        setMyTeamName(state, action: SetMyTeamNameAction) {
            state.myTeamName = action.payload
        },
        inviteToMyTeam(state, action: InviteToMyTeamAction) {
            state.memberIds.push(action.payload)
        },
        dropOutOfMyTeam(state, action: DropOutOfMyTeamAction) {
            const newmMemberIds = state.memberIds.filter((memberId) => {
                return memberId !== action.payload
            })
            return { sportsType: state.sportsType, myTeamName: state.myTeamName, memberIds: newmMemberIds }
        },
    }
})

export const {
    setSportsType,
    setMyTeamName,
    inviteToMyTeam,
    dropOutOfMyTeam
} = myTeamSlice.actions;

export default myTeamSlice.reducer;