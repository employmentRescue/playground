package com.ssafy.teammatching.service;

import com.ssafy.teammatching.dto.Match;

import java.text.ParseException;

public interface MatchingService {
    Match startMatch(String matchDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String sports, String gameType, String registerTime , int teamId) throws InterruptedException, ParseException;
    void cancelMatching(int teamId);
}
