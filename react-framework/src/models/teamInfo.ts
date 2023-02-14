export interface teamInfo {
    teamId?: number;
    hostId: number;
    name: string;
    description?: string;
    gameType: string;
    level: string;
    sports: string;
    teamMemberList: number[];
    point?: number;
    teamProfileImgUrl?: string;
}