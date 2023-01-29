package com.ssafy.matching.controller;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.service.GatheringService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE} , maxAge = 6000)
@RestController
@RequestMapping("/gathering")
@Api("운동 모임 정보 API")
public class GatheringController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private GatheringService gatheringService;

    public GatheringController(GatheringService gatheringService) {
        this.gatheringService = gatheringService;
    }

    @ApiOperation(value = "운동 모임 전체 리스트", notes = "운동 모임 전체를 반환한다", response = List.class)
    @GetMapping
    public ResponseEntity<?> list() {
        try {
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

    @ApiOperation(value = "운동 모임 상세 보기", notes = "모임 id에 해당하는 운동 모임을 반환한다", response = Gathering.class)
    @GetMapping("/{gatheringid}")
    public ResponseEntity<?> view(@PathVariable("gatheringid") int gatheringId) throws Exception {
        return new ResponseEntity<Gathering>(gatheringService.getByGatheringId(gatheringId), HttpStatus.OK);
    }

    @ApiOperation(value = "운동 모임 등록하기", notes = "새로 운동 모임을 등록한다.", response = List.class)
    @PostMapping("/register")
    public void register(@RequestBody @ApiParam(value = "운동 모임 정보", required = true) Gathering gathering) throws Exception {
        System.out.println(gathering);

        gatheringService.registerGathering(gathering);

//        if (gatheringService.registerGathering(gathering)) {
//            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
//        }
//        return new ResponseEntity<String>(FAIL, HttpStatus.OK);
    }

    @ApiOperation(value = "운동 모임 수정하기", notes = "운동 모임을 수정한다.", response = List.class)
    @PutMapping
    public void update(@RequestBody @ApiParam(value = "운동 모임 정보", required = true) Gathering gathering) throws Exception {
        System.out.println(gathering);

        gatheringService.updateGathering(gathering);
    }

    @ApiOperation(value = "운동 모임 삭제하기", notes = "모임Id에 해당하는 운동 모임을 수정한다.", response = List.class)
    @DeleteMapping("{gatheringid}")
    public void delete(@PathVariable("gatheringid") int gatheringId) throws Exception {
        gatheringService.deleteGathering(gatheringId);
    }

    //

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
