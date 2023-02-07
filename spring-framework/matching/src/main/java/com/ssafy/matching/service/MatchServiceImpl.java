package com.ssafy.matching.service;

import com.ssafy.matching.dto.Match;
import com.ssafy.matching.dto.TeamMatchResult;
import com.ssafy.matching.dto.TeamMember;
import com.ssafy.matching.repository.MatchRepository;
import com.ssafy.matching.repository.TeamMatchResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class MatchServiceImpl implements MatchService {
    @Autowired
    MatchRepository matchRepository;

    @Autowired
    TeamMatchResultRepository teamMatchResultRepository;

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

}
