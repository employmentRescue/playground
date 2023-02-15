package com.ssafy.teammatching.service;

import com.ssafy.teammatching.dto.Match;

public interface MatchingService {
    Match startMatch(String matchDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String sports, String gameType, int teamId) throws InterruptedException;
    void cancelMatching(int teamId);
}
