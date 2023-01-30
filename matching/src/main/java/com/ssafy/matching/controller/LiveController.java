package com.ssafy.matching.controller;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.dto.MemberGathering;
import com.ssafy.matching.service.GatheringService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE} , maxAge = 6000)
@RestController
@RequestMapping("/live")
@Api("실시간 운동 모임 정보 API")
public class LiveController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private GatheringService gatheringService;

    @Autowired
    public LiveController(GatheringService gatheringService) {
        this.gatheringService = gatheringService;
    }

    @ApiOperation(value = "실시간 운동 모임 전체 리스트", notes = "내 위치 기준 반경 3km 안의 모든 운동 모임을 반환한다", response = List.class)
    @GetMapping
    public ResponseEntity<?> list(@RequestParam float latX, @RequestParam float latY) {
        try {
            List<Gathering> list = gatheringService.findGatheringsByMyLocation(latX, latY);
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

    @ApiOperation(value = "운동 모임 상세 보기", notes = "모임 id에 해당하는 운동 모임을 반환한다", response = Gathering.class)
    @GetMapping("/{gatheringid}")
    public ResponseEntity<?> view(@PathVariable("gatheringid") int gatheringId) throws Exception {
        System.out.println("Gatheringcontroller view() 실행");
        return new ResponseEntity<Gathering>(gatheringService.getByGatheringId(gatheringId), HttpStatus.OK);
    }

    @ApiOperation(value = "운동 모임 등록하기", notes = "새로 운동 모임을 등록한다.")
    @PostMapping("/register")
    public void register(@RequestBody @ApiParam(value = "운동 모임 정보", required = true) Gathering gathering) throws Exception {
        System.out.println(gathering);

        gatheringService.registerGathering(gathering);
    }

    @ApiOperation(value = "운동 모임 수정하기", notes = "운동 모임을 수정한다.")
    @PutMapping
    public void update(@RequestBody @ApiParam(value = "운동 모임 정보", required = true) Gathering gathering) throws Exception {
        System.out.println(gathering);

        gatheringService.updateGathering(gathering);
    }

    @ApiOperation(value = "운동 모임 삭제하기", notes = "모임Id에 해당하는 운동 모임을 수정한다.")
    @DeleteMapping("/{gatheringid}")
    public void delete(@PathVariable("gatheringid") int gatheringId) throws Exception {
        gatheringService.deleteGathering(gatheringId);
    }

    @ApiOperation(value = "운동 모임에 참여하기", notes = "운동모임에 참여한다.")
    @PostMapping("/join")
    public void join(@RequestBody @ApiParam(value = "운동 모임 멤버 정보", required = true) MemberGathering memberGathering) throws Exception {
        System.out.println(memberGathering);

        gatheringService.joinGathering(memberGathering);
    }

    @ApiOperation(value = "운동 모임 참여 취소하기", notes = "모임Id와 유저ID에 해당하는 운동 모임을 삭제한다.")
    @DeleteMapping("/leave/{gatheringid}")
    public void delete(int gatheringId, int memberId) throws Exception {
        gatheringService.leaveGathering(gatheringId, memberId);
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
