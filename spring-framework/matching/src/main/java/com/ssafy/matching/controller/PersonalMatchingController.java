package com.ssafy.matching.controller;

import com.ssafy.matching.service.PersonalMatchingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/matching")
@Api("개인 매칭 API(구현중)")
public class PersonalMatchingController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private PersonalMatchingService personalMathcingService;

    @Autowired
    public PersonalMatchingController(PersonalMatchingService personalMathcingService) {
        this.personalMathcingService = personalMathcingService;
    }

    @ApiOperation(value = "운동 모임 개인 매칭(구현중)", notes = "필터 조건(날짜(startDate), 지역(latX, latY), 반경(distance), 최소 시작시간(minStartTime), 최대 시작시간(maxStartTime), 수준(level), 최소 게임시간(minPlayTime), 최대 게임시간(maxPlayTime), 성별(sex), 운동종류(sports), 게임종류(gameType))에 맞는 운동 모임을 검색해 반환한다", response = List.class)
    @PostMapping("/personal")
    public ResponseEntity<?> match(@RequestBody Map<String, Object> map) {
        //TODO 운동 모임 개인 매칭
        return null;
    }

    @ApiOperation(value = "운동 모임 개인 매칭 취소", notes = "운동 모임 개인 매칭을 취소한다.")
    @DeleteMapping("/personal")
    public ResponseEntity<?> cancle(int userId) {
        //TODO 운동 모임 개인 매칭 취소
        return null;
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
