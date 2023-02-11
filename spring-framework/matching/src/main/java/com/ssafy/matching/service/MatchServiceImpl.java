package com.ssafy.matching.service;

import com.ssafy.matching.dto.Match;
import com.ssafy.matching.dto.TeamMatchResult;
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

    private  RankingService rankingService;

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
    //TODO ERROR : Column 'match_id' cannot be null
    public void deleteMatch(int matchId) {
        matchRepository.deleteByMatchId(matchId);
    }

    @Override
    public String registerTeamMatchResult(TeamMatchResult teamMatchResult, int matchId) {
        Match match = matchRepository.getByMatchId(matchId);
        teamMatchResult.setMatch(match);

        //TODO 수정해야함 - 사이즈로 구별안된다... -> match is_done 칼럼으로 구별하기
        int size = match.getTeamMatchResultList().size();
        //isDone 가져와서 비교하기
        boolean isDone = match.isDone();

        if(!isDone) { //경기 결과 등록한 팀 아직 없음
            teamMatchResultRepository.save(teamMatchResult);
        }else { //등록한 다른 팀 있음
            TeamMatchResult teamMatchResultOp = match.getTeamMatchResultList().get(0);
            String resultMe = teamMatchResult.getResult();
            String resultOp = teamMatchResultOp.getResult();
            
            //잘못 입력하는 경우
            if (resultMe.equals("승")) {
                if (resultOp.equals("승") || resultOp.equals("패")) {
                    return "fail";
                }
            } else if (resultMe.equals("패")) {
                if (resultOp.equals("패")) {
                    return "fail";
                } else if (resultMe.equals("무")) {
                    if (resultOp.equals("승") || resultOp.equals("패")) {
                        return "fail";
                    }
                }
            }

            teamMatchResultRepository.save(teamMatchResult);
            
            //TODO 포인트 산정하기
            rankingService.updatePoint(teamMatchResult, teamMatchResultOp);
        }

        return "success";
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
