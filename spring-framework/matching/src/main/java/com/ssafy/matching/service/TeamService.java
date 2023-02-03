package com.ssafy.matching.service;

import com.ssafy.matching.dto.Team;
import com.ssafy.matching.dto.TeamMember;

public interface TeamService {
    Team viewTeamByTeamId(int teamId);
    Team registerTeam(Team team);
    void joinTeam(TeamMember teamMember);
}
