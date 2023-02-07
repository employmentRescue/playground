package com.ssafy.matching.controller;

import com.ssafy.matching.dto.Match;
import com.ssafy.matching.dto.Team;
import com.ssafy.matching.dto.TeamMatchResult;
import com.ssafy.matching.service.MatchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/match")
@Api("팀 경기 API")
public class MatchController {
    private MatchService matchService;

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

    @ApiOperation(value = "팀 경기 결과를 등록하기", notes = "팀 경기 결과를 등록한다.")
    @PutMapping("/record/{matchid}")
    public ResponseEntity<TeamMatchResult> record(@PathVariable("matchid") int matchId, @RequestBody @ApiParam(value = "팀 경기 정보", required = true) TeamMatchResult teamMatchResult) throws Exception {
        return new ResponseEntity<TeamMatchResult>(matchService.registerTeamMatchResult(teamMatchResult, matchId), HttpStatus.OK);
    }

    @ApiOperation(value = "팀 경기 결과를 수정하기", notes = "팀 경기 결과를 수정한다.")
    @PutMapping("/rewrite/{matchid}")
    public ResponseEntity<TeamMatchResult> rewrite(@PathVariable("matchid") int matchId, @RequestBody @ApiParam(value = "팀 경기 정보", required = true) TeamMatchResult teamMatchResult) throws Exception {
        return new ResponseEntity<TeamMatchResult>(matchService.updateTeamMatchResult(teamMatchResult, matchId), HttpStatus.OK);
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
