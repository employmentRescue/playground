package com.ssafy.matching.repository;

import com.ssafy.matching.dto.Match;
import com.ssafy.matching.dto.TeamMatchResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMatchResultRepository extends JpaRepository<TeamMatchResult, Integer> {
    TeamMatchResult save(TeamMatchResult teamMatchResult);
    void deleteByMatchAndTeamId(Match match, int teamId);
}
