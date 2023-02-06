package com.ssafy.matching.service;

import com.ssafy.matching.dto.Match;
import com.ssafy.matching.dto.TeamMatchResult;
import com.ssafy.matching.dto.TeamMember;
import com.ssafy.matching.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class MatchServiceImpl implements MatchService {
    @Autowired
    MatchRepository matchRepository;

    @Override
    public Match registerMatch(Match match) {
        TeamMatchResult teamMatchResult = match.getTeamMatchResultList().get(0);
        teamMatchResult.setMatch(match);

        return matchRepository.save(match);
    }
}
