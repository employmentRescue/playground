package com.ssafy.matching.controller;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.dto.Team;
import com.ssafy.matching.service.MemberService;
import com.ssafy.matching.service.TeamService;
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
@RequestMapping("/mypage")
public class MemberController {
    private TeamService teamService;
    private MemberService memberService;

    @ApiOperation(value = "나의 팀 보기", notes = "멤버 id에 해당하는 팀 리스트를 반환한다", response = Team.class)
    @GetMapping("/team/{memberid}")
    public ResponseEntity<?> viewMyTeams(@PathVariable("memberid") Long memberId) throws Exception {
        return new ResponseEntity<List<Team>>(teamService.viewTeamsByMemberId(memberId), HttpStatus.OK);
    }

    @ApiOperation(value = "유저가 신청한 운동 모임과 팀 경기 전체 리스트(시간 지난 것, 안지난 것 모두)", notes = "유저가 신청한 운동 모임과 팀 경기 전체 리스트를 반환한다")
    @GetMapping("/join/whole/{memberid}")
    public ResponseEntity<?> wholeList(@PathVariable("memberid") Long memberId) {
        try {
            Map<String, Object> map = memberService.getWholeJoinListByMemberId(memberId);

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

    @ApiOperation(value = "유저가 신청한 운동 모임 리스트(시간 안지난 것만)", notes = "유저가 신청한 운동 모임 전체를 반환한다")
    @GetMapping("/join/part/{memberid}")
    public ResponseEntity<?> partList(@PathVariable("memberid") Long memberId) {
        try {
            List<Gathering> list = memberService.getTimeNotPastJoinListByMemberId(memberId);

            if (list != null && !list.isEmpty()) {
                System.out.println(list);
                return new ResponseEntity<List<Gathering>>(list, HttpStatus.OK);
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
