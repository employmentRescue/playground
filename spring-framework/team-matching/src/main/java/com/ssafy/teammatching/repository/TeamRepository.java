package com.ssafy.teammatching.repository;

import com.ssafy.teammatching.dto.Team;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    Team findTeamByTeamId(int teamId);
}
