package com.ssafy.matching.controller;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/matching")
public class MatchingController {
    private UserService userService;

    @ApiOperation(value = "유저가 신청한 운동 모임과 팀 경기 전체 리스트", notes = "유저가 신청한 운동 모임과 팀 경기 전체 리스트를 반환한다")
    @GetMapping("/{memberid}")
    public ResponseEntity<?> list(@PathVariable("memberid") Long memberId) {
        //TODO 유저가 신청한 운동 모임과 팀 경기 전체 리스트
        try {
            Map<String, Object> map = userService.getJoinListByMemberId(memberId);

            if (map != null && !map.isEmpty()) {
                System.out.println(map);
                return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
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
