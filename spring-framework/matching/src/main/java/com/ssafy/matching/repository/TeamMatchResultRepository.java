package com.ssafy.matching.repository;

import com.ssafy.matching.dto.TeamMatchResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMatchResultRepository extends JpaRepository<TeamMatchResult, Integer> {
    TeamMatchResult save(TeamMatchResult teamMatchResult);
}
