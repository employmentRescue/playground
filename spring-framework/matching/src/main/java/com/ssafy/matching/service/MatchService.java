package com.ssafy.matching.service;

import com.ssafy.matching.dto.Match;
import com.ssafy.matching.dto.TeamMatchResult;

import java.util.List;

public interface MatchService {
    Match viewMatchById(int matchId);
    List<Match> searchMatchByTeamName(String teamName);

    Match registerMatch(Match match);
    Match updateMatch(Match match);

    TeamMatchResult registerTeamMatchResult(TeamMatchResult teamMatchResult, int matchId);
    TeamMatchResult updateTeamMatchResult(TeamMatchResult teamMatchResult, int matchId);

    TeamMatchResult joinMatch(TeamMatchResult teamMatchResult, int matchId);
    void leaveMatch(int matchId, int teamId);
}
