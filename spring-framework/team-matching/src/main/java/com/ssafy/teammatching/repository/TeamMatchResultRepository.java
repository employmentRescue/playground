package com.ssafy.teammatching.repository;

import com.ssafy.teammatching.dto.Match;
import com.ssafy.teammatching.dto.TeamMatchResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMatchResultRepository extends JpaRepository<TeamMatchResult, Integer> {
    TeamMatchResult save(TeamMatchResult teamMatchResult);
    void deleteByMatchAndTeamId(Match match, int teamId);
}
