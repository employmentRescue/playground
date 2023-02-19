package com.ssafy.teammatching.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MatchingResult {
    private Long memberId; //알림을 보낼 멤버 아이디
    private int matchId; //매칭된 경기의 아이디
    private String opTeamName; //매칭된 경기의 상대방 팀이름
    private String opTier; //매칭된 경기의 상대방 티어

    @Builder
    public MatchingResult(Long memberId, int matchId, String opTeamName, String opTier) {
        this.memberId = memberId;
        this.matchId = matchId;
        this.opTeamName = opTeamName;
        this.opTier = opTier;
    }
}
