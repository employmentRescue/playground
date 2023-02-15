package com.ssafy.teammatching.service;

import com.ssafy.teammatching.dto.*;
import com.ssafy.teammatching.repository.MatchRepository;
import com.ssafy.teammatching.repository.TeamMatchResultRepository;
import com.ssafy.teammatching.repository.TeamRepository;
import com.ssafy.teammatching.repository.WaitingRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
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
    public Match startMatch(String matchDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String sports, String gameType, int teamId) {
        Team team = teamRepository.findTeamByTeamId(teamId);
        int point = team.getPoint();

        //1. 대기열에서 같은 조건의 방이 있는지 검색
        List<WaitingRoom> roomList = waitingRoomRepository.getWaitingRoomByFilter(matchDate, lat, lng, distance, minStartTime, maxStartTime , sports, gameType, point);

        if(roomList != null && roomList.size() != 0) { //2. 있으면 대기열에서 꺼내서 Match db에 저장
            WaitingRoom room = roomList.get(0); //매칭된 방
            waitingRoomRepository.deleteByTeamId(room.getTeamId()); //대기열에서 매칭된 팀 꺼내기

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

            //TODO Field 'match_id' doesn't have a default value
            //TODO Cannot add or update a child row: a foreign key constraint fails (`playground`.`team_match_result`, CONSTRAINT `fk_result_match_id` FOREIGN KEY (`match_id`) REFERENCES `match` (`match_id`) ON DELETE CASCADE ON UPDATE CASCADE)
            matchRepository.save(match);

            return match;

        } else { //3. 없으면 대기열에 등록
            Date now = new Date();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String registerTime = simpleDateFormat.format(now);

            WaitingRoom waitingRoom = WaitingRoom.builder()
                    .teamId(teamId)
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

            return null;
        }
    }

    @Override
    public void cancelMatching(int teamId) {
        waitingRoomRepository.deleteByTeamId(teamId);
    }

}
