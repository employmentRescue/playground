package com.ssafy.matching.service;

import com.ssafy.matching.dto.TeamMatchResult;
import com.ssafy.matching.dto.TeamStats;

import java.util.List;
import java.util.Map;

public interface RankingService {
    List<TeamStats> viewRanking(String sports, String gameType);

    List<Map<String, Object>> viewMyTeamsRanking(long memberId);

    void updatePoint(TeamMatchResult teamMatchResultMe, TeamMatchResult teamMatchResultOp);
}
