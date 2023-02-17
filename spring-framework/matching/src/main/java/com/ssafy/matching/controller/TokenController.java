package com.ssafy.matching.controller;

import com.ssafy.matching.dto.MemberDetail;
import com.ssafy.matching.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/token")
@Api("유저 토큰 API")
public class TokenController {
    private MemberService memberService;

    @ApiOperation(value = "유저 토큰 등록하기", notes = "유저의 토큰을 등록한다.")
    @PostMapping("/register")
    public ResponseEntity<?> register(Long memberId, String token) throws Exception {
        System.out.println("토큰 controller: ");
        System.out.println("memberId: " + memberId);
        System.out.println("token: " + token);
        return new ResponseEntity<MemberDetail>(memberService.updateMemberDetail(memberId, token), HttpStatus.OK);
    }
}
