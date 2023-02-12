package com.ssafy.matching.controller;

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

import java.util.List;
import java.util.Map;

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
        return new ResponseEntity<Map<String, Object>>(teamService.viewTeamByTeamId(teamId), HttpStatus.OK);
    }
    
    @ApiOperation(value = "팀 등록하기", notes = "새로 팀을 등록한다.")
    @PostMapping("/register")
    public ResponseEntity<Team> register(@RequestBody @ApiParam(value = "팀 정보", required = true) Team team) throws Exception {
        System.out.println(team);
        return new ResponseEntity<Team>(teamService.registerTeam(team), HttpStatus.OK);
    }

    @ApiOperation(value = "팀 수정하기", notes = "팀을 수정한다.")
    @PutMapping
    public ResponseEntity<Team> update(@RequestBody @ApiParam(value = "팀 정보", required = true) Team team) throws Exception {
        System.out.println(team);

        return new ResponseEntity<Team>(teamService.updateTeam(team), HttpStatus.OK);
    }

    @ApiOperation(value = "팀 삭제하기(구현중)", notes = "팀Id에 해당하는 팀을 삭제한다.")
    @DeleteMapping("/{teamid}")
    public void delete(@PathVariable("teamid") int teamId) throws Exception {
        teamService.deleteTeam(teamId);
    }

    @ApiOperation(value = "팀에 초대하기", notes = "팀에 초대한다.")
    @PostMapping("/invite/{teamid}")
    public void join(@PathVariable("teamid") int teamId, @RequestBody @ApiParam(value = "팀-멤버 정보", required = true) TeamMember teamMember) throws Exception {
        System.out.println(teamMember);
        System.out.println(teamId);
        teamService.joinTeam(teamMember, teamId);
    }

    @ApiOperation(value = "팀에서 나가기", notes = "팀Id와 유저ID에 해당하는 팀에서 나간다.")
    @DeleteMapping("/leave")
    public void delete(int teamId, long memberId) throws Exception {
        teamService.leaveTeam(teamId, memberId);
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
