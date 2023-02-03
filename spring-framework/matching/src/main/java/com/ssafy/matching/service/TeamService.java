package com.ssafy.matching.service;

import com.ssafy.matching.dto.Team;

public interface TeamService {
    Team viewTeamByTeamId(int teamId);
    Team registerTeam(Team team);
}
