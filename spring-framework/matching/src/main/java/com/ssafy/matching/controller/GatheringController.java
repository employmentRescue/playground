package com.ssafy.matching.controller;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.dto.GatheringMember;
import com.ssafy.matching.service.GatheringService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/gathering")
@Api("운동 모임 정보 API")
public class GatheringController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private GatheringService gatheringService;

    @ApiOperation(value = "운동 모임 전체 리스트", notes = "운동 모임 전체를 반환한다", response = List.class)
    @GetMapping
    public ResponseEntity<?> list() {
        try {
            System.out.println("Gatheringcontroller list() 실행");
            List<Gathering> list = gatheringService.findAll();
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

    @ApiOperation(value = "운동 모임 검색(구현중)", notes = "필터 조건(날짜(startDate), 지역(latX, latY), 반경(distance), 최소 시작시간(minStartTime), 최대 시작시간(maxStartTime), 수준(level), 최소 게임시간(minPlayTime), 최대 게임시간(maxPlayTime), 성별(sex), 운동종류(sports), 게임종류(gameType))에 맞는 운동 모임을 검색해 반환한다", response = List.class)
    @PostMapping
    public ResponseEntity<?> listByFilter(@RequestBody Map<String, Object> map) {
        try {
            List<Gathering> list = gatheringService.findGatheringsByFilter(map);
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

//        if (gatheringService.registerGathering(gathering)) {
//            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
//        }
//        return new ResponseEntity<String>(FAIL, HttpStatus.OK);
    }

    @ApiOperation(value = "운동 모임 수정하기", notes = "운동 모임을 수정한다.")
    @PutMapping
    public void update(@RequestBody @ApiParam(value = "운동 모임 정보", required = true) Gathering gathering) throws Exception {
        System.out.println(gathering);

        gatheringService.updateGathering(gathering);
    }

    @ApiOperation(value = "운동 모임 삭제하기", notes = "모임Id에 해당하는 운동 모임을 삭제한다.")
    @DeleteMapping("/{gatheringid}")
    public void delete(@PathVariable("gatheringid") int gatheringId) throws Exception {
        gatheringService.deleteGathering(gatheringId);
    }

    @ApiOperation(value = "운동 모임에 참여하기", notes = "운동모임에 참여한다.")
    @PostMapping("/join")
    public void join(@RequestBody @ApiParam(value = "운동 모임 멤버 정보", required = true) GatheringMember memberGathering) throws Exception {
        System.out.println(memberGathering);

        gatheringService.joinGathering(memberGathering);
    }

    @ApiOperation(value = "운동 모임 참여 취소하기", notes = "모임Id와 유저ID에 해당하는 운동 모임을 삭제한다.")
    @DeleteMapping("/leave/{gatheringid}")
    public void delete(int gatheringId, long memberId) throws Exception {
        gatheringService.leaveGathering(gatheringId, memberId);
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
