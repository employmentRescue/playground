package com.ssafy.matching.repository;

import com.ssafy.matching.dto.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Integer> {
    Match getByMatchId(int matchId);
    Match save(Match match);
    void deleteByMatchId(int matchId);
}
