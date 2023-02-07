package com.ssafy.matching.service;

import com.ssafy.matching.dto.Match;
import com.ssafy.matching.dto.TeamMatchResult;

public interface MatchService {
    Match viewMatchById(int matchId);

    Match registerMatch(Match match);
    Match updateMatch(Match match);

    TeamMatchResult registerTeamMatchResult(TeamMatchResult teamMatchResult, int matchId);
    TeamMatchResult updateTeamMatchResult(TeamMatchResult teamMatchResult, int matchId);

    TeamMatchResult joinMatch(TeamMatchResult teamMatchResult, int matchId);
    void leaveMatch(int matchId, int teamId);
}
