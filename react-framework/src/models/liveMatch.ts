import { place } from "./place";

export interface liveMatch {
    liveId?: number,
    memberId?: number,
    place: place,
    sports?: string,
    detail: string,
    hostId: number,
    hostNickName?: string,
    currentPeopleNum: number,
    totalPeopleNum: number,
    registTime: string,
    memberList?: number[] | null,
}