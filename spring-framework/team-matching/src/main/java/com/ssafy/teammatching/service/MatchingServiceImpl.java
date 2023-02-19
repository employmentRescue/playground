package com.ssafy.teammatching.service;

import com.ssafy.teammatching.dto.*;
import com.ssafy.teammatching.repository.MatchRepository;
import com.ssafy.teammatching.repository.TeamMatchResultRepository;
import com.ssafy.teammatching.repository.TeamRepository;
import com.ssafy.teammatching.repository.WaitingRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class MatchingServiceImpl implements MatchingService {
    @Autowired
    TeamRepository teamRepository;

    @Autowired
    WaitingRoomRepository waitingRoomRepository;

    @Autowired
    MatchRepository matchRepository;

    @Autowired
    TeamMatchResultRepository teamMatchResultRepository;

    @Override
    public Map<String, Object> startMatch(String matchDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String sports, String gameType, String registerTime, int teamId, long memberId) throws ParseException, InterruptedException {
        Team myTeam = teamRepository.findTeamByTeamId(teamId);
        int point = myTeam.getPoint();

        int count = 0;
        while(true) {
            //1. 대기열에서 같은 조건의 방이 있는지 검색
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date now = new Date();
            Date register = simpleDateFormat.parse(registerTime);

            long diffMin = (now.getTime() - register.getTime()) / 60000; //분 차이

            List<WaitingRoom> roomList = new ArrayList<>();
            if(diffMin < 30) {
                roomList = waitingRoomRepository.getWaitingRoomByFilter1(matchDate, lat, lng, distance, minStartTime, maxStartTime , sports, gameType, point, teamId);
            } else if(30 <= diffMin && diffMin < 60) {
                roomList = waitingRoomRepository.getWaitingRoomByFilter2(matchDate, lat, lng, distance, minStartTime, maxStartTime , sports, gameType, point, teamId);
            } else {
                roomList = waitingRoomRepository.getWaitingRoomByFilter3(matchDate, lat, lng, distance, minStartTime, maxStartTime , sports, gameType, point, teamId);
            }
            
            //2. 있으면 대기열에서 꺼내서 Match db에 저장
            if(roomList != null && roomList.size() != 0) {
                WaitingRoom room = roomList.get(0); //매칭된 방

                //매칭 완료 알람 정보 저장
                TeamStats myTeamStats = getTeamStats(myTeam); //매칭 요청한 팀 정보

                Team opTeam = teamRepository.findTeamByTeamId(room.getTeamId());
                TeamStats opTeamStats = getTeamStats(opTeam); //먼저 대기열에 들어와 매칭 당한 팀 정보

                //대기열에서 매칭된 팀 삭제하기
                waitingRoomRepository.deleteByTeamId(teamId); //우리팀 대기열에서 삭제
                waitingRoomRepository.deleteByTeamId(room.getTeamId()); //상대팀 대기열에서 삭제

                //Match에 등록하기
                PreferredPlace preferredPlace = PreferredPlace.builder()
                        .address("")
                        .lat(room.getLat())
                        .lng(room.getLng())
                        .build();

                Match match = Match.builder()
                        .hostId(room.getTeamId())
                        .matchDate(room.getMatchDate())
                        .minStartTime(room.getMinStartTime())
                        .maxStartTime(room.getMaxStartTime())
                        .distance(room.getDistance())
                        .matchSports(sports)
                        .matchGameType(gameType)
                        .isDone(false)
                        .preferredPlace(preferredPlace)
                        .build();

                List<TeamMatchResult> teamMatchResultList = new ArrayList<>();
                TeamMatchResult teamMatch1 = TeamMatchResult.builder().teamId(teamId).build();
                TeamMatchResult teamMatch2 = TeamMatchResult.builder().teamId(room.getTeamId()).build();

                teamMatch1.setMatch(match);
                teamMatch2.setMatch(match);

                teamMatchResultList.add(teamMatch1);
                teamMatchResultList.add(teamMatch2);

                match.setTeamMatchResultList(teamMatchResultList);

                System.out.println("match: " + match);

                matchRepository.save(match);

                //Map으로 담아서 각각 상대팀의 정보 반환하기
                Map<String, Object> resultMap = new HashMap<>();
                MatchingResult myTeamMatchingResult = MatchingResult.builder() //우리팀과 매칭된 상대팀 정보
                        .memberId(memberId)
                        .opTeamId(room.getTeamId())
                        .opTeamName(opTeamStats.getTeamName())
                        .opTier(opTeamStats.getTier())
                        .build();

                MatchingResult opTeamMatchingResult = MatchingResult.builder() //상대팀이 매칭된 우리팀 정보
                        .memberId(room.getMemberId())
                        .opTeamId(teamId)
                        .opTeamName(myTeamStats.getTeamName())
                        .opTier(myTeamStats.getTier())
                        .build();

                System.out.println(myTeamMatchingResult);
                System.out.println(opTeamMatchingResult);

                resultMap.put("myTeamMatchingResult", myTeamMatchingResult);
                resultMap.put("opTeamMatchingResult", opTeamMatchingResult);

                resultMap.put("match", match); //매칭된 경기의 정보

                return resultMap;

            } else { //3. 없으면 대기열에 등록 or 기다림
                WaitingRoom waitingRoom = waitingRoomRepository.findByTeamId(teamId);
                System.out.println("내 팀 대기열 상태: " + waitingRoom);

                //취소한거 알았을때 취소하도록함
//                if(waitingRoom != null && waitingRoom.isCanceled()) {System.out.println("취소됨"); return null;}

                if(waitingRoom == null) {
                    if(count > 0) { //대기열에 있다가 대기열에서 빠졌는지 확인(내가 취소함 or 내가 상대방에게 매칭당함)
                        System.out.println("취소됨 or 매칭 당함");
                        return null;
                    }

                    //기존 대기열에 없으면 대기열에 등록
                    System.out.println("대기열에 등록");
                    
                    waitingRoom = WaitingRoom.builder()
                            .teamId(teamId)
                            .memberId(memberId)
                            .matchDate(matchDate)
                            .lat(lat)
                            .lng(lng)
                            .distance(distance)
                            .minStartTime(minStartTime)
                            .maxStartTime(maxStartTime)
                            .sports(sports)
                            .gameType(gameType)
                            .teamPoint(point)
                            .registerTime(registerTime)
                            .build();

                    waitingRoomRepository.save(waitingRoom);

                    count++;
                }
            }

            Thread.sleep(10000); //10초 대기
        }

    }

    @Override
    @Transactional
    public void cancelMatching(int teamId) {
//        WaitingRoom waitingRoom = waitingRoomRepository.findByTeamId(teamId);
//        waitingRoom.setCanceled(true);
//
//        waitingRoomRepository.save(waitingRoom);
        waitingRoomRepository.deleteByTeamId(teamId);
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
