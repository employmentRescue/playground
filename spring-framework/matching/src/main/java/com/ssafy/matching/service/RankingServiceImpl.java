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
            case "rating" : teamStatsList.sort(Comparator.comparing(TeamStats::getPoint).reversed()); break;
        }

        return teamStatsList;
    }

    @Override
    public Map<Integer, Object> viewMyTeamsRanking(int teamId, String sort) {
        Team myTeam = teamRepository.getByTeamId(teamId); //1. 나의 팀 검색

        //2. 나의 팀 기준 상위 3개, 하위 3개 팀 검색
        TeamStats myTeamStat = getTeamStats(myTeam);
        List<Team> teamList = teamRepository.findAll();

        List<TeamStats> teamStatsList = new ArrayList<>();
        for(int i = 0; i < teamList.size(); i++) {
            TeamStats teamStats = getTeamStats(teamList.get(i));
            teamStatsList.add(teamStats);
        }

        Map<Integer, Object> resultMap = new HashMap<>();

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
            case "rating":
                teamStatsList.sort(Comparator.comparing(TeamStats::getPoint).reversed());
                resultMap = getResultMap(teamStatsList, myTeamStat);
                break;
        }

        return resultMap;
    }

    private Map<Integer, Object> getResultMap(List<TeamStats> teamStatsList, TeamStats myTeamStat) {
        Map<Integer, Object> resultMap = new HashMap<>();

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

        for(int i = idx - 3; i <= idx + 3; i++) {
            if(0 <= i && i < teamStatsList.size()) {
                resultMap.put(i + 1, teamStatsList.get(i));
            }
        }

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

    //TODO 티어 좀 더 세분화하기
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
