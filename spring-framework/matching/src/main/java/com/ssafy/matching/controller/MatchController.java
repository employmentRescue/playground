package com.ssafy.matching.controller;

import com.ssafy.matching.dto.Match;
import com.ssafy.matching.dto.TeamMatchResult;
import com.ssafy.matching.service.MatchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/match")
@Api("팀 경기 API")
public class MatchController {
    private MatchService matchService;

    @ApiOperation(value = "팀 경기 필터 검색", notes = "필터 조건(날짜(matchDate), 지역(lat, lng), 반경(distance), 최소 시작시간(minStartTime), 최대 시작시간(maxStartTime), 스포츠 종류(sports), 게임 타입(gameType), 정렬조건(sort - tierLow, tierHigh, distance))에 맞는 운동 모임을 검색해 반환한다", response = List.class)
    @GetMapping
    public ResponseEntity<?> listByFilter(String matchDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String sports, String gameType, String sort) {
        try {
            System.out.println("gameType: "+ gameType);
            List<Match> list = matchService.findMatchesByFilter(matchDate, lat, lng, distance, minStartTime, maxStartTime, sports, gameType, sort);
            if (list != null && !list.isEmpty()) {
                System.out.println(list);
                return new ResponseEntity<List<Match>>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "팀 경기 보기", notes = "경기id에 해당하는 팀 경기를 확인한다.")
    @GetMapping("/{matchid}")
    public ResponseEntity<Match> view(@PathVariable("matchid") int matchId) throws Exception {
        return new ResponseEntity<Match>(matchService.viewMatchById(matchId), HttpStatus.OK);
    }

    @ApiOperation(value = "팀 경기 팀 이름으로 검색", notes = "팀이름에 해당하는 팀 경기를 확인한다.")
    @GetMapping("/search/{teamname}")
    public ResponseEntity<List<Match>> search(@PathVariable("teamname") String teamName) throws Exception {
        return new ResponseEntity<List<Match>>(matchService.searchMatchByTeamName(teamName), HttpStatus.OK);
    }

    @ApiOperation(value = "팀 경기 등록하기", notes = "새로 팀 경기를 등록한다.")
    @PostMapping("/register")
    public ResponseEntity<Match> register(@RequestBody @ApiParam(value = "경기 정보", required = true) Match match) throws Exception {
        System.out.println(match);
        return new ResponseEntity<Match>(matchService.registerMatch(match), HttpStatus.OK);
    }

    @ApiOperation(value = "팀 경기 수정하기", notes = "팀 경기를 수정한다.")
    @PutMapping
    public ResponseEntity<Match> update(@RequestBody @ApiParam(value = "팀 경기 정보", required = true) Match match) throws Exception {
        System.out.println(match);
        return new ResponseEntity<Match>(matchService.updateMatch(match), HttpStatus.OK);
    }

    @ApiOperation(value = "경기 삭제하기", notes = "경기Id에 해당하는 경기를 삭제한다.")
    @DeleteMapping("/{matchid}")
    public void delete(@PathVariable("matchid") int matchId) throws Exception {
        matchService.deleteMatch(matchId);
    }

    @ApiOperation(value = "팀 경기 결과를 등록하기", notes = "팀 경기 결과를 등록한다.")
    @PutMapping("/record/{matchid}")
    public ResponseEntity<?> record(@PathVariable("matchid") int matchId, @RequestBody @ApiParam(value = "팀 경기 정보", required = true) TeamMatchResult teamMatchResult) throws Exception {
        String result = matchService.registerTeamMatchResult(teamMatchResult, matchId);
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "팀 경기 결과를 수정하기(기능 추가중)", notes = "팀 경기 결과를 수정한다.")
    @PutMapping("/rewrite/{matchid}")
    public ResponseEntity<TeamMatchResult> rewrite(@PathVariable("matchid") int matchId, @RequestBody @ApiParam(value = "팀 경기 정보", required = true) TeamMatchResult teamMatchResult) throws Exception {
        return new ResponseEntity<TeamMatchResult>(matchService.updateTeamMatchResult(teamMatchResult, matchId), HttpStatus.OK);
    }

    @ApiOperation(value = "경기에서 팀이 참여한다", notes = "경기에서 팀이 참여한다.")
    @PostMapping("/join/{matchid}")
    public ResponseEntity<TeamMatchResult> join(@PathVariable("matchid") int matchId, @RequestBody @ApiParam(value = "팀 경기 정보", required = true) TeamMatchResult teamMatchResult) throws Exception {
        return new ResponseEntity<TeamMatchResult>(matchService.joinMatch(teamMatchResult, matchId), HttpStatus.OK);
    }

    @ApiOperation(value = "경기에서 팀이 나간다", notes = "경기에서 팀이 나간다.")
    @PostMapping("/leave")
    public void leave(int matchId, int teamId) throws Exception {
        matchService.leaveMatch(matchId, teamId);
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
