export interface liveMatch {
    liveId?: number,
    memberId?: number,
    place: string,
    detail: string,
    hostId: number,
    hostNickName: string,
    currentPeopleNum: number,
    totalPeopleNum: number,
    registTime: string,
    memberList?: number[] | null,
}