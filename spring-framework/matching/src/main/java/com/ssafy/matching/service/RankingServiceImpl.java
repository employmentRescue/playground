package com.ssafy.matching.service;

import com.ssafy.matching.dto.Team;
import com.ssafy.matching.dto.TeamMatchResult;
import com.ssafy.matching.dto.TeamStats;
import com.ssafy.matching.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RankingServiceImpl implements RankingService {
    @Autowired
    TeamRepository teamRepository;

    @Override
    public List<TeamStats> viewRanking(String sports, String gameType) {
        List<TeamStats> resultList = new ArrayList<>();

        List<Team> teamList = teamRepository.getTop20BySportsAndGameTypeOrderByPointDesc(sports, gameType);
        for(int i = 0; i < teamList.size(); i++) {
            TeamStats teamStats = new TeamStats();
            teamStats.setTeamName(teamList.get(i).getName());

            List<TeamMatchResult> teamMatchResultList = teamList.get(i).getTeamMatchResultList();

            int win = 0, draw = 0, lose = 0;
            for(TeamMatchResult teamMatchResult : teamMatchResultList) {
                String teamResult = teamMatchResult.getResult();

                switch (teamResult) {
                    case "승" : win++; break;
                    case "무" : draw++; break;
                    case "패" : lose++; break;
                }
            }

            teamStats.setMatchTimes(teamMatchResultList.size());
            teamStats.setWin(win);
            teamStats.setDraw(draw);
            teamStats.setLose(lose);

            int point = teamList.get(i).getPoint();

            teamStats.setPoint(point);
            teamStats.setTier(calculateTier(point));

            resultList.add(teamStats);
        }

        return resultList;
    }

    @Override
    public List<List<Team>> viewMyTeamsRanking(int teamId) {
        //1. 나의 팀 리스트 검색


        //2. 나의 팀 기준 상위 3개, 하위 3개 팀 검색

        return null;
    }

    public String calculateTier(int point) {
        if(point > 2700) return "Gold1";
        else if (2400 < point && point <= 2700) return "Gold2";
        else if (2100 < point && point <= 2400) return "Gold3";
        else if (1800 < point && point <= 2100) return "silver1";
        else if (1500 < point && point <= 1800) return "silver2";
        else if (1300 < point && point <= 1500) return "silver3";
        else if (1000 < point && point <= 1300) return "bronze1";
        else if (900 < point && point <= 1000) return "bronze2";
        else if (point <= 900) return "bronze3";

        return "";
    }

}
