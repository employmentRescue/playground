import { createSlice } from "@reduxjs/toolkit";

export interface MyTeam {
    sportsType: "축구" | "농구" | "배드민턴";
    myTeamName: string;
    teamLevel: "입문" | "초수" | "중수" | "고수";
    personnel: "1vs1" | "3vs3" | "5vs5" | "6vs6" | "11vs11"
    memberIds: number[];
    record: { total: number, win: number, draw: number, lose: number };
    rank: { point: number, tier: string }
}

interface SetSportsTypeAction {
    payload: MyTeam["sportsType"]
}
interface SetMyTeamNameAction {
    payload: string
}
interface SetMyTeamLevelAction {
    payload: MyTeam["teamLevel"]
}
interface SetPersonnelAction {
    payload: MyTeam["personnel"]
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
    teamLevel: "입문",
    personnel: "11vs11",
    memberIds: [],
    record: { total: 0, win: 0, draw: 0, lose: 0 },
    rank: { point: 1500, tier: "sliver3" }
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
        setMyTeamLevel(state, action: SetMyTeamLevelAction) {
            state.teamLevel = action.payload
        },
        setPersonnel(state, action: SetPersonnelAction) {
            state.myTeamName = action.payload
        },
        inviteToMyTeam(state, action: InviteToMyTeamAction) {
            state.memberIds.push(action.payload)
        },
        dropOutOfMyTeam(state, action: DropOutOfMyTeamAction) {
            return { ...state, memberIds: state.memberIds.filter(memberId => memberId !== action.payload) }
        },
    }
})

export const {
    setSportsType,
    setMyTeamName,
    setMyTeamLevel,
    setPersonnel,
    inviteToMyTeam,
    dropOutOfMyTeam
} = myTeamSlice.actions;

export default myTeamSlice.reducer;