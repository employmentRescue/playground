package com.ssafy.matching.controller;

import com.ssafy.matching.dto.Team;
import com.ssafy.matching.service.RankingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@Api("팀 랭킹 API")
@RequestMapping("/ranking")
public class RankingController {

    private RankingService rankingService;

    @ApiOperation(value = "운동 모임 필터 검색", notes = "필터 조건(운동종류, 게임종류)에 맞는 랭킹을 검색해 반환한다", response = List.class)
    @GetMapping
    public ResponseEntity<?> listByFilter(String sports, String gameType) {
        try {
            List<Team> list = rankingService.viewRanking(sports, gameType);
            if (list != null && !list.isEmpty()) {
                System.out.println(list);
                return new ResponseEntity<List<Team>>(list, HttpStatus.OK);
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
