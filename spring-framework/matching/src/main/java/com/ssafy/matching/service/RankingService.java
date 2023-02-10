package com.ssafy.matching.service;

import com.ssafy.matching.dto.Team;
import com.ssafy.matching.dto.TeamStats;

import java.util.List;

public interface RankingService {
    List<TeamStats> viewRanking(String sports, String gameType);

    List<List<TeamStats>> viewMyTeamsRanking(long memberId);
}
