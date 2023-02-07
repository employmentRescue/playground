package com.ssafy.matching.repository;

import com.ssafy.matching.dto.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Integer> {
    Match getByMatchId(int matchId);

    @Query(value = "SELECT * " +
            "FROM `match` m, team_match_result r, team t " +
            "WHERE m.match_id = r.match_id AND r.team_id = t.team_id " +
            "AND t.name LIKE %?1%", nativeQuery = true)
    List<Match> getMatchByTeamName(String teamName);

    Match save(Match match);
    void deleteByMatchId(int matchId);
}
