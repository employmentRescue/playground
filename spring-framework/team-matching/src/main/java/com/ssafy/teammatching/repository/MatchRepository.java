package com.ssafy.teammatching.repository;

import com.ssafy.teammatching.dto.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Integer> {
    Match save(Match match);
}
