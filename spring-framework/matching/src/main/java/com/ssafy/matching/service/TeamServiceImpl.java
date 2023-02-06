package com.ssafy.matching.service;

import com.ssafy.matching.dto.Team;
import com.ssafy.matching.dto.TeamMember;
import com.ssafy.matching.repository.TeamMemberRepository;
import com.ssafy.matching.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class TeamServiceImpl implements TeamService {
    @Autowired
    TeamRepository teamRepository;

    @Autowired
    TeamMemberRepository teamMemberRepository;

    @Override
    public Team viewTeamByTeamId(int teamId) {
        return teamRepository.getByTeamId(teamId);
    }

    @Override
    public Team registerTeam(Team team) {
        System.out.println(team);

        for(TeamMember teamMember : team.getTeamMemberList()) {
            teamMember.setTeam(team);
        }

        return teamRepository.save(team);
    }

    @Override
    public Team updateTeam(Team team) {
        return teamRepository.save(team);
    }

    @Override
    public void deleteTeam(int teamId) {
        teamRepository.deleteByTeamId(teamId);
    }

    @Override
    public void joinTeam(TeamMember teamMember, int teamId) {
        Team team = teamRepository.getByTeamId(teamId);
        teamMember.setTeam(team);
        teamMemberRepository.save(teamMember);
    }

}
