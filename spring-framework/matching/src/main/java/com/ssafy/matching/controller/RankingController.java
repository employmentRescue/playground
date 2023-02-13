package com.ssafy.matching.controller;

import com.ssafy.matching.dto.TeamStats;
import com.ssafy.matching.service.RankingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@Api("팀 랭킹 API")
@RequestMapping("/ranking")
public class RankingController {

    private RankingService rankingService;

    @ApiOperation(value = "팀 랭킹 필터 검색", notes = "필터 조건(운동종류, 게임종류, 정렬 타입 - 종목, 인원, 정렬타입-경기, 승, 무, 패, rating)에 맞는 랭킹을 검색해 반환한다", response = List.class)
    @GetMapping
    public ResponseEntity<?> list(String sports, String gameType, String sort) {
        try {
            List<TeamStats> list = rankingService.viewRanking(sports, gameType, sort);
            if (list != null && !list.isEmpty()) {
                System.out.println(list);
                return new ResponseEntity<List<TeamStats>>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "나의 팀 랭킹 검색", notes = "정렬조건(경기, 승, 무, 패, rating)에 맞는 나의 팀 랭킹 정보를 불러온다.", response = List.class)
    @GetMapping("/{teamid}")
    public ResponseEntity<?> view(@PathVariable("teamid") int teamId, String sort) {
        try {
            Map<String, Object> list = rankingService.viewMyTeamsRanking(teamId, sort);
            System.out.println(list);
            if (list != null && !list.isEmpty()) {
                return new ResponseEntity<Map<String, Object>>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
