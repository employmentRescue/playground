package com.ssafy.matching.service;

import com.ssafy.matching.dto.Team;
import com.ssafy.matching.dto.TeamMatchResult;
import com.ssafy.matching.dto.TeamStats;
import com.ssafy.matching.repository.MatchRepository;
import com.ssafy.matching.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class RankingServiceImpl implements RankingService {
    @Autowired
    TeamRepository teamRepository;

    @Autowired
    MatchRepository matchRepository;

    @Override
    public List<TeamStats> viewRanking(String sports, String gameType, String sort) {
        List<Team> teamList = teamRepository.getTop20BySportsAndGameTypeOrderByPointDesc(sports, gameType);
        List<TeamStats> teamStatsList = new ArrayList<>();

        for(int i = 0; i < teamList.size(); i++) {
            TeamStats teamStats = getTeamStats(teamList.get(i));
            teamStatsList.add(teamStats);
        }
        
        //정렬 조건
        switch (sort) {
            case "경기" : teamStatsList.sort(Comparator.comparing(TeamStats::getMatchTimes).reversed()); break;
            case "승" : teamStatsList.sort(Comparator.comparing(TeamStats::getWin).reversed()); break;
            case "무" : teamStatsList.sort(Comparator.comparing(TeamStats::getDraw).reversed()); break;
            case "패" : teamStatsList.sort(Comparator.comparing(TeamStats::getLose).reversed()); break;
            case "Rating" : teamStatsList.sort(Comparator.comparing(TeamStats::getPoint).reversed()); break;
        }

        return teamStatsList;
    }

    @Override
    public Map<String, Object> viewMyTeamsRanking(int teamId, String sort) {
        Map<String, Object> resultMap = new HashMap<>();

        Team myTeam = teamRepository.getByTeamId(teamId); //1. 나의 팀 검색

        //2. 나의 팀 기준 상위 3개, 하위 3개 팀 검색
        TeamStats myTeamStat = getTeamStats(myTeam);
        List<Team> teamList = teamRepository.findAll();

        List<TeamStats> teamStatsList = new ArrayList<>();
        for(int i = 0; i < teamList.size(); i++) {
            TeamStats teamStats = getTeamStats(teamList.get(i));
            teamStatsList.add(teamStats);
        }

        //정렬 조건
        switch (sort) {
            case "경기":
                teamStatsList.sort(Comparator.comparing(TeamStats::getMatchTimes).reversed());
                resultMap = getResultMap(teamStatsList, myTeamStat);
                break;
            case "승":
                teamStatsList.sort(Comparator.comparing(TeamStats::getWin).reversed());
                resultMap = getResultMap(teamStatsList, myTeamStat);
                break;
            case "무":
                teamStatsList.sort(Comparator.comparing(TeamStats::getDraw).reversed());
                resultMap = getResultMap(teamStatsList, myTeamStat);
                break;
            case "패":
                teamStatsList.sort(Comparator.comparing(TeamStats::getLose).reversed());
                resultMap = getResultMap(teamStatsList, myTeamStat);
                break;
            case "Rating":
                teamStatsList.sort(Comparator.comparing(TeamStats::getPoint).reversed());
                resultMap = getResultMap(teamStatsList, myTeamStat);
                break;
        }

        return resultMap;
    }

    private Map<String, Object> getResultMap(List<TeamStats> teamStatsList, TeamStats myTeamStat) {
        Map<String, Object> resultMap = new HashMap<>();
        Map<Integer, Object> rankingMap = new HashMap<>();

//        int idx = teamStatsList.indexOf(myTeamStat);
//        System.out.println("인덱스: "+idx); // -1 리턴됨

        int idx = -1;
        for(int i = 0; i < teamStatsList.size(); i++) {
            if(teamStatsList.get(i).getTeamId() == myTeamStat.getTeamId()) {
                idx = i;
                break;
            }
        }
        System.out.println("인덱스: "+idx);

        if(idx < 5) {
            for(int i = 0; i < 10; i++) {
                rankingMap.put(i + 1, teamStatsList.get(i));
            }
        } else if(5 <= idx && idx < teamStatsList.size() - 5) {
            for(int i = idx - 5; i <= idx + 5; i++) {
                rankingMap.put(i + 1, teamStatsList.get(i));
            }
        } else {
            for(int i = teamStatsList.size() - 10; i < teamStatsList.size(); i++) {
                rankingMap.put(i + 1, teamStatsList.get(i));
            }
        }

        resultMap.put("myTeamRank", idx + 1);
        resultMap.put("rankingMap", rankingMap);

        return resultMap;
    }

    @Override
    public void updatePoint(TeamMatchResult teamMatchResultMe, TeamMatchResult teamMatchResultOp) {
        Team teamMe = teamRepository.getByTeamId(teamMatchResultMe.getTeamId());
        Team teamOp = teamRepository.getByTeamId(teamMatchResultOp.getTeamId());

        //1. 예상 승률 구하기
        int Pme = teamMe.getPoint();
        int Pop = teamOp.getPoint();

        System.out.println("전 Pme: " + Pme);
        System.out.println("전 Pop: " + Pop);

        double Wme = 1.0 / (Math.pow(10, ((Pop - Pme) / 400)) + 1); //내 팀의 예상 승률
        double Wop = 1.0 / (Math.pow(10, ((Pme - Pop) / 400)) + 1); //상대 팀의 예상 승률

        System.out.println("Wme: " + Wme);
        System.out.println("Wop: " + Wop);

        //2. 점수 계산하기
        int K = 30; //가중치
        double W = 0; //경기 결과

        //경기 결과 별 W
        String resultMe = teamMatchResultMe.getResult();
        String resultOp = teamMatchResultOp.getResult();

        W = getW(W, resultMe);
        Pme += (int)(K * (W - Wme));

        W = getW(W, resultOp);
        Pop += (int)(K * (W - Wop));

        System.out.println("후 Pme: " + Pme);
        System.out.println("후 Pop: " + Pop);

        //3. 팀 객체에서 점수 정보 갱신하기
        teamMe.setPoint(Pme);
        teamOp.setPoint(Pop);

        teamRepository.save(teamMe);
        teamRepository.save(teamOp);
    }

    private double getW(double w, String resultMe) {
        switch (resultMe) {
            case "승" : w = 1; break;
            case "무" : w = 0.5; break;
            case "패" : w = 0; break;
        }
        return w;
    }

    public TeamStats getTeamStats(Team team) {
        TeamStats teamStats = new TeamStats();
        teamStats.setTeamId(team.getTeamId());
        teamStats.setTeamName(team.getName());

        List<TeamMatchResult> teamMatchResultList = team.getTeamMatchResultList();

        int win = 0, draw = 0, lose = 0;
        for(TeamMatchResult teamMatchResult : teamMatchResultList) {

            if(teamMatchResult.getResult() == null) continue;

            switch (teamMatchResult.getResult()) {
                case "승" : win++; break;
                case "무" : draw++; break;
                case "패" : lose++; break;
                default: break;
            }
        }

        teamStats.setMatchTimes(teamMatchResultList.size());
        teamStats.setWin(win);
        teamStats.setDraw(draw);
        teamStats.setLose(lose);

        int point = team.getPoint();

        teamStats.setPoint(point);
        teamStats.setTier(calculateTier(point));

        return  teamStats;
    }

    public String calculateTier(int point) {
        if(point > 2300) return "Platinum";
        else if (2200 < point && point <= 2300) return "Gold1";
        else if (2100 < point && point <= 2200) return "Gold2";
        else if (2000 < point && point <= 2100) return "Gold3";
        else if (1900 < point && point <= 2000) return "Gold4";
        else if (1800 < point && point <= 1900) return "Gold5";
        else if (1700 < point && point <= 1800) return "silver1";
        else if (1600 < point && point <= 1700) return "silver2";
        else if (1500 < point && point <= 1600) return "silver3";
        else if (1400 < point && point <= 1500) return "silver4";
        else if (1300 < point && point <= 1400) return "silver5";
        else if (1200 < point && point <= 1300) return "bronze1";
        else if (1100 < point && point <= 1200) return "bronze2";
        else if (1000 < point && point <= 1100) return "bronze3";
        else if (900 < point && point <= 1000) return "bronze4";
        else if (point <= 900) return "bronze5";

        return "";
    }

}
