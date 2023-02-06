package com.ssafy.matching.service;

import com.ssafy.matching.dto.Team;
import com.ssafy.matching.dto.TeamMember;

public interface TeamService {
    Team viewTeamByTeamId(int teamId);

    Team registerTeam(Team team);
    Team updateTeam(Team team);
    void deleteTeam(int teamId);

    void joinTeam(TeamMember teamMember, int teamId);
    void leaveTeam(int teamId, long memberId);
}
