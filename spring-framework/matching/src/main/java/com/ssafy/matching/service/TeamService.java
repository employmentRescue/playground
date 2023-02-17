package com.ssafy.matching.service;

import com.ssafy.matching.dto.Team;
import com.ssafy.matching.dto.TeamMember;

import java.util.List;
import java.util.Map;

public interface TeamService {
    Map<String, Object> viewTeamByTeamId(int teamId);

    Team registerTeam(Team team);
    Team updateTeam(Team team);
    void deleteTeam(int teamId);

    void joinTeam(TeamMember teamMember, int teamId);
    void leaveTeam(int teamId, long memberId);

    List<Map<String, Object>> viewTeamsByMemberId(long memberId);
}
