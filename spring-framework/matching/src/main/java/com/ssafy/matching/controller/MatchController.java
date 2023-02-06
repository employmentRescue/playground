package com.ssafy.matching.controller;

import com.ssafy.matching.dto.Match;
import com.ssafy.matching.dto.Team;
import com.ssafy.matching.service.MatchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
