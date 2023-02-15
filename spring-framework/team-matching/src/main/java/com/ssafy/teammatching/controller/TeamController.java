package com.ssafy.teammatching.controller;

import com.ssafy.teammatching.dto.Match;
import com.ssafy.teammatching.service.MatchingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
@RequestMapping("/team")
@Api("팀 API")
public class TeamController {
    private MatchingService matchingService;

    @ApiOperation(value = "원하는 조건으로 팀 경기 매칭하기(구현중)", notes = "조건(날짜(matchDate), 지역(lat, lng), 반경(distance), 최소 시작시간(minStartTime), 최대 시작시간(maxStartTime), 스포츠 종류(sports), 게임 타입(gameType)에 맞는 팀 경기를 매칭해준다.")
    @PostMapping("/matching")
    public ResponseEntity<Match> match(String matchDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String sports, String gameType, String registerTime, int teamId) throws Exception {
        return new ResponseEntity<Match>(matchingService.startMatch(matchDate, lat, lng, distance, minStartTime, maxStartTime, sports, gameType, registerTime, teamId), HttpStatus.OK);
    }

    @ApiOperation(value = "팀 경기 매칭하기 취소(구현중)", notes = "팀 경기 매칭하기를 취소시킨다.")
    @DeleteMapping("/matching")
    public void cancel(int teamId) throws Exception {
        matchingService.cancelMatching(teamId);
    }

    @GetMapping("/matching/hello")
    public String test() {
        return "team-matching server - hello";
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
