package com.ssafy.matching.service;

import com.ssafy.matching.dto.Team;
import com.ssafy.matching.dto.TeamMember;
import com.ssafy.matching.dto.TeamStats;
import com.ssafy.matching.repository.TeamMemberRepository;
import com.ssafy.matching.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class TeamServiceImpl implements TeamService {
    @Autowired
    TeamRepository teamRepository;

    @Autowired
    TeamMemberRepository teamMemberRepository;

    @Autowired
    RankingServiceImpl rankingService;

    @Override
    public Map<String, Object> viewTeamByTeamId(int teamId) {
        Map<String, Object> map = new HashMap<>();

        Team team = teamRepository.getByTeamId(teamId);
        TeamStats teamStats = rankingService.getTeamStats(team);

        map.put("team", team);
        map.put("teamStats", teamStats);

        return map;
    }

    @Override
    public Team registerTeam(Team team) {
        System.out.println(team);

        String level = team.getLevel();
        switch (level) {
            case "입문": team.setPoint(900); break;
            case "초보": team.setPoint(1200); break;
            case "중수": team.setPoint(1500); break;
            case "고수": team.setPoint(1800); break;
        }

        for(TeamMember teamMember : team.getTeamMemberList()) {
            teamMember.setTeam(team);
        }

        return teamRepository.save(team);
    }

    @Override
    public Team updateTeam(Team team) {
        for(TeamMember teamMember : team.getTeamMemberList()) {
            teamMember.setTeam(team);
        }

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

    @Override
    public void leaveTeam(int teamId, long memberId) {
        Team team = teamRepository.getByTeamId(teamId);
        teamMemberRepository.deleteByTeamAndMemberId(team, memberId);
    }

    @Override
    public List<Map<String, Object>> viewTeamsByMemberId(long memberId) {
        List<Map<String, Object>> mapList = new ArrayList<>();

        List<Team> teamList = teamRepository.getTeamsByMemberId(memberId);
        for (Team team : teamList) {
            Map<String, Object> map = new HashMap<>();

            TeamStats teamStats = rankingService.getTeamStats(team);

            map.put("team", team);
            map.put("teamStats", teamStats);

            mapList.add(map);
        }

        return mapList;
    }

}
