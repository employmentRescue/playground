package com.ssafy.matching.controller;

import com.ssafy.matching.dto.GatheringMember;
import com.ssafy.matching.dto.Team;
import com.ssafy.matching.dto.TeamMember;
import com.ssafy.matching.service.TeamService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/team")
@Api("팀 API")
public class TeamController {
    private TeamService teamService;

    @ApiOperation(value = "팀 상세 보기", notes = "팀 id에 해당하는 팀 정보를 반환한다", response = Team.class)
    @GetMapping("/{teamid}")
    public ResponseEntity<?> view(@PathVariable("teamid") int teamId) throws Exception {
        System.out.println("TeamController view() 실행");
        return new ResponseEntity<Team>(teamService.viewTeamByTeamId(teamId), HttpStatus.OK);
    }
    
    //TODO 팀 등록 - ERROR
    @ApiOperation(value = "팀 등록하기(구현중)", notes = "새로 팀을 등록한다.")
    @PostMapping("/register")
    public ResponseEntity<Team> register(@RequestBody @ApiParam(value = "팀 정보", required = true) Team team) throws Exception {
        System.out.println(team);
        return new ResponseEntity<Team>(teamService.registerTeam(team), HttpStatus.OK);
    }

    @ApiOperation(value = "팀에 초대하기", notes = "팀에 초대한다.")
    @PostMapping("/invite")
    public void join(@RequestBody @ApiParam(value = "팀-멤버 정보", required = true) TeamMember teamMember) throws Exception {
        System.out.println(teamMember);
        teamService.joinTeam(teamMember);
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
