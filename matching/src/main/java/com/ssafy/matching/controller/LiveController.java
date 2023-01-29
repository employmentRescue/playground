package com.ssafy.matching.controller;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.service.GatheringService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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

    //

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
