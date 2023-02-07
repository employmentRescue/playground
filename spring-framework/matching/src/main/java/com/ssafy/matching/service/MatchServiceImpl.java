package com.ssafy.matching.service;

import com.ssafy.matching.dto.Match;
import com.ssafy.matching.dto.Team;
import com.ssafy.matching.dto.TeamMatchResult;
import com.ssafy.matching.dto.TeamMember;
import com.ssafy.matching.repository.MatchRepository;
import com.ssafy.matching.repository.TeamMatchResultRepository;
import com.ssafy.matching.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class MatchServiceImpl implements MatchService {
    @Autowired
    MatchRepository matchRepository;

    @Autowired
    TeamMatchResultRepository teamMatchResultRepository;

    @Autowired
    TeamRepository teamRepository;

    @Override
    public Match viewMatchById(int matchId) {
        Match match = matchRepository.getByMatchId(matchId);

        //TODO teamMatchResult 안에 Team 객체도 반환하게 하기
//        List<TeamMatchResult> teamMatchResultList = match.getTeamMatchResultList();
//
//        for(TeamMatchResult teamMatchResult : teamMatchResultList) {
//            int teamId = teamMatchResult.getTeamId();
//            Team team = teamRepository.getByTeamId(teamId);
//            teamMatchResult.setTeam(team);
//        }
//
//        match.setTeamMatchResultList(teamMatchResultList);

        return match;
    }

    @Override
    public List<Match> searchMatchByTeamName(String teamName) {
        return matchRepository.getMatchByTeamName(teamName);
    }

    @Override
    public Match registerMatch(Match match) {
        TeamMatchResult teamMatchResult = match.getTeamMatchResultList().get(0);
        teamMatchResult.setMatch(match);

        return matchRepository.save(match);
    }

    @Override
    public Match updateMatch(Match match) {
        for(TeamMatchResult teamMatchResult : match.getTeamMatchResultList()) {
            teamMatchResult.setMatch(match);
        }

        return matchRepository.save(match);
    }

    @Override
    public TeamMatchResult registerTeamMatchResult(TeamMatchResult teamMatchResult, int matchId) {
        Match match = matchRepository.getByMatchId(matchId);
        teamMatchResult.setMatch(match);
        return teamMatchResultRepository.save(teamMatchResult);
    }

    @Override
    public TeamMatchResult updateTeamMatchResult(TeamMatchResult teamMatchResult, int matchId) {
        Match match = matchRepository.getByMatchId(matchId);
        teamMatchResult.setMatch(match);
        return teamMatchResultRepository.save(teamMatchResult);
    }

    @Override
    public TeamMatchResult joinMatch(TeamMatchResult teamMatchResult, int matchId) {
        Match match = matchRepository.getByMatchId(matchId);
        teamMatchResult.setMatch(match);
        return teamMatchResultRepository.save(teamMatchResult);
    }

    @Override
    public void leaveMatch(int matchId, int teamId) {
        Match match = matchRepository.getByMatchId(matchId);
        teamMatchResultRepository.deleteByMatchAndTeamId(match, teamId);
    }

}
