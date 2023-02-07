package com.ssafy.matching.service;

import com.ssafy.matching.dto.Match;

public interface MatchService {
    Match registerMatch(Match match);
    Match updateMatch(Match match);
}
