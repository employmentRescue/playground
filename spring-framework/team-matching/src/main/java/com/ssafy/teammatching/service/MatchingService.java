package com.ssafy.teammatching.service;

import com.ssafy.teammatching.dto.Match;

import java.text.ParseException;
import java.util.Map;

public interface MatchingService {
    Map<String, Object> startMatch(String matchDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String sports, String gameType, String registerTime , int teamId, long memberId) throws InterruptedException, ParseException;
    void cancelMatching(int teamId);
}
