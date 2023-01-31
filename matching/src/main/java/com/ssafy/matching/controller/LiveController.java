package com.ssafy.matching.controller;

import com.ssafy.matching.dto.Live;
import com.ssafy.matching.dto.LiveMember;
import com.ssafy.matching.service.LiveService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE} , maxAge = 6000)
@RestController
@AllArgsConstructor
@RequestMapping("/live")
@Api("실시간 운동 모임 정보 API")
public class LiveController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private LiveService liveService;

    @ApiOperation(value = "실시간 운동 모임 전체 리스트", notes = "내 위치 기준 반경 3km 안의 모든 실시간 운동 모임을 반환한다", response = List.class)
    @GetMapping
    public ResponseEntity<?> list(@RequestParam float lat, @RequestParam float lng) {
        try {
            List<Live> list = liveService.findLiveByLocation(lat, lng);

            if (list != null && !list.isEmpty()) {
                System.out.println(list);
                return new ResponseEntity<List<Live>>(list, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }

    }

    @ApiOperation(value = "실시간 운동 모임 상세 보기", notes = "실시간 운동 모임 id에 해당하는 실시간 운동 모임을 반환한다", response = Live.class)
    @GetMapping("/{liveid}")
    public ResponseEntity<?> view(@PathVariable("liveid") int liveId) throws Exception {
        System.out.println("LiveController view() 실행");
        return new ResponseEntity<Live>(liveService.getByLiveId(liveId), HttpStatus.OK);
    }

    @ApiOperation(value = "실시간 운동 모임 등록하기", notes = "새로 실시간 운동 모임을 등록한다.")
    @PostMapping("/register")
    public void register(@RequestBody @ApiParam(value = "실시간 운동 모임 정보", required = true) Live live) throws Exception {
        System.out.println(live);

        liveService.registerLive(live);
    }

    @ApiOperation(value = "실시간 운동 모임 수정하기", notes = "실시간 운동 모임을 수정한다.")
    @PutMapping
    public void update(@RequestBody @ApiParam(value = "실시간 운동 모임 정보", required = true) Live live) throws Exception {
        System.out.println(live);

        liveService.updateLive(live);
    }

    @ApiOperation(value = "실시간 운동 모임 삭제하기", notes = "실시간 운동 모임 Id에 해당하는 실시간 운동 모임을 수정한다.")
    @DeleteMapping("/{liveid}")
    public void delete(@PathVariable("liveid") int liveId) throws Exception {
        liveService.deleteLive(liveId);
    }

    @ApiOperation(value = "실시간 운동 모임에 참여하기", notes = "실시간 운동 모임에 참여한다.")
    @PostMapping("/join")
    public void join(@RequestBody @ApiParam(value = "실시간 운동 모임 멤버 정보", required = true) LiveMember liveMember) throws Exception {
        System.out.println(liveMember);

        liveService.joinLive(liveMember);
    }

    @ApiOperation(value = "실시간 운동 모임 참여 취소하기", notes = "모임Id와 유저ID에 해당하는 운동 모임을 삭제한다.")
    @DeleteMapping("/leave/{gatheringid}")
    public void delete(int liveId, int memberId) throws Exception {
        liveService.leaveLive(liveId, memberId);
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
