export interface teamInfo {
    teamId?: number;
    name: string;
    description?: string;
    gameType: string;
    level: string;
    sports: string;
    teamMemberList: object[];
    point?: number;
    teamProfileImgUrl: string;
}