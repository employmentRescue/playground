package com.ssafy.teammatching.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.teammatching.dto.FCM;
import com.ssafy.teammatching.dto.Match;
import com.ssafy.teammatching.dto.MemberDetail;
import com.ssafy.teammatching.dto.TeamStats;
import com.ssafy.teammatching.service.MatchingService;
import com.ssafy.teammatching.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/team")
@Api("팀 API")
public class TeamController {
    private MatchingService matchingService;
    private MemberService memberService;

    @ApiOperation(value = "원하는 조건으로 팀 경기 매칭하기", notes = "조건(날짜(matchDate), 지역(lat, lng), 반경(distance), 최소 시작시간(minStartTime), 최대 시작시간(maxStartTime), 스포츠 종류(sports), 게임 타입(gameType)에 맞는 팀 경기를 매칭해준다.")
    @PostMapping("/matching")
    public ResponseEntity<?> match(String matchDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String sports, String gameType, String registerTime, int teamId, Long memberId) throws Exception {
        Map<String, Object> map = matchingService.startMatch(matchDate, lat, lng, distance, minStartTime, maxStartTime, sports, gameType, registerTime, teamId);

        //알림 서버로 보내기
        URL url = new URL ("https://i8b309.p.ssafy.io/notify/send/token-list");
        //HttpURLConnection 객체를 생성해 openConnection 메소드로 url 연결
        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        //전송 방식 (POST)
        httpConn.setRequestMethod("POST");
        //application/json 형식으로 전송, Request body를 JSON으로 던져줌.
        httpConn.setRequestProperty("Content-Type", "application/json; utf-8");
        //Response data를 JSON으로 받도록 설정
        httpConn.setRequestProperty("Accept", "application/json");
        //Output Stream을 POST 데이터로 전송
        httpConn.setDoOutput(true);
        //json data
        ObjectMapper objectMapper = new ObjectMapper();

        //멤버의 토큰 가져오기 -> 토큰 리스트에 넣기
        MemberDetail memberDetail = memberService.getMemberDetail(memberId);
        String token = memberDetail.getWebFcmToken();
        token = "fNGBxyTXLbabHNgQbvL9Y1:APA91bFTWorrmDTNO9--VergBZSiOX_SP7ZdeBWNi2lYmG3Dwzw30kvObyek9Aq4Zr1-vma_cduMZUBuLhSXZy5EOchanPYAKCeXSJE2IfBM4Ah7c_iEVL2EuEmt0Svr0Ua7c91nCC2-";

        List<String> token_list = new ArrayList<>();
        token_list.add(token);

        //데이터 담기
        Match match = (Match) map.get("match");
        TeamStats teamStats = (TeamStats) map.get("opTeamStat");

        Map<String, String> data = new HashMap<>();
        data.put("matchId", String.valueOf(match.getMatchId()));
        data.put("teamName", teamStats.getTeamName()); //상대방 팀 이름
        data.put("tier", teamStats.getTier()); //상대방 티어

        FCM fcm = FCM.builder()
                .title("매칭 완료")
                .body("매칭이 완료되었습니다")
                .token_list(token_list)
                .data(data)
                .build();

        String jsonInputString = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(fcm);
        System.out.println(jsonInputString);

        //JSON 보내는 Output stream
        try(OutputStream os = httpConn.getOutputStream()) {
            byte[] input = jsonInputString.getBytes("utf-8");
            os.write(input, 0, input.length);
        }
        httpConn.connect();
        httpConn.getInputStream().readAllBytes();

        if (httpConn.getResponseCode() / 100 != 2) throw new Exception();

        return new ResponseEntity<>(match, HttpStatus.OK);
    }

    @ApiOperation(value = "팀 경기 매칭하기 취소", notes = "팀 경기 매칭하기를 취소시킨다.")
    @DeleteMapping("/matching")
    public void cancel(int teamId) throws Exception {
        matchingService.cancelMatching(teamId);
    }

    @GetMapping("/matching/hello")
    public String test() {
        return "team-matching server - hello";
    }

    private ResponseEntity<?> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
