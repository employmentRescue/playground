package com.ssafy.matching.service;

import com.ssafy.matching.dto.Team;

import java.util.List;

public interface RankingService {
    List<Team> viewRanking(String sports, String gameType);
}
