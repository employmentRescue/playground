package com.ssafy.teammatching.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.ssafy.teammatching.dto.*;
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
    public ResponseEntity<?> match(String matchDate, Double lat, Double lng, Integer distance, String minStartTime, String maxStartTime, String sports, String gameType, String registerTime, Integer teamId, Long memberId) throws Exception {
        System.out.println("들어오는거 확인: " + lat + " " + lng + " " + distance + " ");

        Map<String, Object> map = matchingService.startMatch(matchDate, lat, lng, distance, minStartTime, maxStartTime, sports, gameType, registerTime, teamId, memberId);

        System.out.println("매칭 결과: " + map);

        if(map != null) {
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

            //매칭 결과 가져오기
            Match match = (Match) map.get("match");
            MatchingResult matchingResult1 = (MatchingResult) map.get("myTeamMatchingResult");
            MatchingResult matchingResult2 = (MatchingResult) map.get("opTeamMatchingResult");

            matchingResult1.setMatchId(match.getMatchId());
            matchingResult2.setMatchId(match.getMatchId());

            //멤버의 토큰 가져오기 -> 토큰 리스트에 넣기
            MemberDetail memberDetail1 = memberService.getMemberDetail(matchingResult1.getMemberId());
            String token1 = memberDetail1.getWebFcmToken();

            MemberDetail memberDetail2 = memberService.getMemberDetail(matchingResult2.getMemberId());
            String token2 = memberDetail2.getWebFcmToken();

            List<String> token_list = new ArrayList<>();
            token_list.add(token1);
            token_list.add(token2);

            //data에 매칭 정보 넣기
            Gson gson = new Gson();
            String jsonString1 = gson.toJson(matchingResult1);
            String jsonString2 = gson.toJson(matchingResult2);

            System.out.println("매칭 멤버1" + jsonString1);
            System.out.println("매칭 멤버2" + jsonString2);

            Map<String, String> data = new HashMap<>();

            data.put("team1", jsonString1);
            data.put("team2", jsonString2);

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
        }

        return new ResponseEntity<>(map, HttpStatus.OK);
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
