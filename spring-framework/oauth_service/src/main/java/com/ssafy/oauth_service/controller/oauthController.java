package com.ssafy.oauth_service.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.oauth_service.Repository.KakaoLoginAccessTokenCacheRepository;
import com.ssafy.oauth_service.Repository.KakaoLoginRefreshTokenCacheRepository;
import com.ssafy.oauth_service.Repository.OAuthRegisterCacheRepository;
import com.ssafy.oauth_service.dto.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/oauth2")
//@CrossOrigin(origins = {"*"})
//@CrossOrigin(origins = {"https://kauth.kakao.com","https://localhost:3000", "https://192.168.31.246", "https://192.168.31.246:3000", "https://192.168.31.246/oauth2/login/kakao"})
public class oauthController {
    @RequestMapping("hello")
    @ResponseBody
    String hello(/*@RequestHeader*/ String userID){
        return "hello - oauth service";
    }


    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    ServletContext servletContext;

    String ReactFramework_baseUrl = "https://localhost:3000";

    @Value("${oauth2.client.registration.client-id.kakao}")
    String kakao_cliendID;


    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    OAuthRegisterCacheRepository oAuthRegisterCacheRepository;

    @Autowired
    KakaoLoginAccessTokenCacheRepository kakaoLoginAccessTokenCacheRepository;

    @Autowired
    KakaoLoginRefreshTokenCacheRepository kakaoLoginRefreshTokenCacheRepository;

    final String api_gateway_url = "https://i8b309.p.ssafy.io";


    public String getURLBase(HttpServletRequest request) throws MalformedURLException {

        URL requestURL = new URL(request.getRequestURL().toString());
        String port = requestURL.getPort() == -1 ? "" : ":" + requestURL.getPort();
        return requestURL.getProtocol() + "://" + requestURL.getHost() + port;

    }



    @RequestMapping("/test")
    ResponseEntity test(@RequestBody Map<String, Object> map){
        try{
            System.out.println(map);

            //JSON 데이터 받을 URL 객체 생성
            URL url = new URL ("http://localhost:9000/user/regist/123");
            //HttpURLConnection 객체를 생성해 openConnection 메소드로 url 연결
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            //전송 방식 (POST)
            con.setRequestMethod("POST");
            //application/json 형식으로 전송, Request body를 JSON으로 던져줌.
            con.setRequestProperty("Content-Type", "application/json; utf-8");
            //Response data를 JSON으로 받도록 설정
            con.setRequestProperty("Accept", "application/json");
            //Output Stream을 POST 데이터로 전송
            con.setDoOutput(true);
            //json data
            String jsonInputString = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(map);
            System.out.println(jsonInputString);

            //JSON 보내는 Output stream
            try(OutputStream os = con.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }
            con.connect();
            con.getInputStream().readAllBytes();


        } catch (Throwable e){
            e.printStackTrace();
        }


        return new ResponseEntity(HttpStatus.OK);
    }





    @RequestMapping("/login/kakao")
    String redirectTologin(HttpServletRequest req) throws MalformedURLException {
        System.out.println(getURLBase(req));

        return "redirect:" + "https://kauth.kakao.com/oauth/authorize?" +
                "response_type=code&client_id=79c6d214ca859ea2806d6bd426ffb1fe" +
                "&redirect_uri=" +
                api_gateway_url + "/oauth2/login"; // 내 서버로 redirect 해서 kakao access_token, kakao refresh_token 받음
        // <- 나중에 naver도 합치면 @RequestMapping("/login/{provider}")로 하면 될듯.
    }







    @RequestMapping("/login")
    String login(@RequestParam Map<String, Object> map, HttpServletRequest req) throws Throwable
    {
        System.out.println("login : " + map);
        System.out.println(getURLBase(req));
        if (map.isEmpty() || !map.containsKey("code")) return "redirect:" + getURLBase(req) + "/login/fail";

        String code = (String) map.get("code");

        // oauth code를 이용해서 access_token, refresh_token 받기
        URL url = new URL("https://kauth.kakao.com/oauth/token"+ "?" +
                                "grant_type=authorization_code&" +
                                "client_id=" + kakao_cliendID + "&" +
                                "redirect_uri=" + URLEncoder.encode(api_gateway_url + "/oauth2/login", StandardCharsets.UTF_8) + "&" +
                                "code=" + code //(String) map.get("code")
                        );


        System.out.println("KAKAO REDIRECT : " + "https://kauth.kakao.com/oauth/token"+ "?" +
                "grant_type=authorization_code&" +
                "client_id=" + kakao_cliendID + "&" +
                "redirect_uri=" + URLEncoder.encode(api_gateway_url + "/oauth2/login", StandardCharsets.UTF_8) + "&" +
                "code=" + code);

        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setRequestMethod("POST");
        httpConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

        InputStream responseStream = httpConn.getInputStream();
//        System.out.println(new String(responseStream.readAllBytes()));
        KakaoTokenByCodeDTO codeResult = objectMapper.readValue(responseStream, KakaoTokenByCodeDTO.class);



        // access_token으로 사용자 정보 받기
        url = new URL("https://kapi.kakao.com/v2/user/me");
        httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setRequestMethod("POST");
        httpConn.setRequestProperty("Authorization", "Bearer " + codeResult.getAccess_token());
        responseStream = httpConn.getInputStream();
        String ret = new String(responseStream.readAllBytes());
        System.out.println(ret);

        KakaoUserInfoDTO userinfo = objectMapper.readValue(ret, KakaoUserInfoDTO.class);
        System.out.println(userinfo);

        System.out.println(entityManager.find(MemberOftenEntity.class, userinfo.getId()));
        if (entityManager.find(MemberOftenEntity.class, userinfo.getId()) != null){
            String accessToken = Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));
            String refreshToken = Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));


            kakaoLoginAccessTokenCacheRepository
                    .save(
                        KakaoLoginAccessTokenCache
                            .builder()
                            .token(accessToken)
                            .kakao_accessToken(codeResult.getAccess_token())
                            .kakao_refreshToken(codeResult.getRefresh_token())
                            .kakao_userID(userinfo.getId())
                                .build()
                        );

            // 연결된 access_token에 대해서만 refresh
            kakaoLoginRefreshTokenCacheRepository
                    .save(
                        KakaoLoginRefreshTokenCache
                                .builder()
                                .token(refreshToken)
                                .connected_access_token(accessToken)
                                    .build()
                    );


//            return "redirect:" + UriComponentsBuilder
//                    .fromHttpUrl(getURLBase(req) + "/login/success")
//                    .queryParam("access_token",accessToken)
//                    .queryParam("refresh_token",refreshToken)
//                    .build()
//                    .toUriString();

            return "redirect:" + api_gateway_url + "/login/success?"
                    + "access_token=" + accessToken
                    + "&refresh_token=" + refreshToken;
        }
        else {
            OAuthRegisterCache registerCache = OAuthRegisterCache
                                            .builder()
                                            .token(Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8)))
                                            .kakao_userID(userinfo.getId())
                                            .kakao_accessToken(codeResult.getAccess_token())
                                            .kakao_refreshToken(codeResult.getRefresh_token())
                                            .build();

            oAuthRegisterCacheRepository.save(registerCache);
            System.out.println(registerCache);

//            System.out.println(getURLBase(req));
//            return "redirect:" + UriComponentsBuilder
//                    .fromHttpUrl(getURLBase(req) + "/login/regist")
//                    .queryParam("code",registerCache.getToken())
//                    .build().toUriString();
            return "redirect:" + api_gateway_url + "/login/regist?code=" + registerCache.getToken();
        }


    }

    @Transactional
    @RequestMapping("/regist")
    ResponseEntity regist(String code, @RequestBody Map<String, Object> json/**/) throws Exception {
        System.out.println(json);

//        System.out.println(code);
//        OAuthRegisterCache loginCache = oAuthRegisterCacheRepository.findById(code).orElse(null);
//        System.out.println("regist : " + loginCache);
//        if (loginCache == null || code == null || code.isEmpty()) return new ResponseEntity(HttpStatus.BAD_REQUEST);
//
//        System.out.println("regist : " + loginCache);


//
//        //JSON 데이터 받을 URL 객체 생성
//        URL url = new URL ("http://localhost:9000/user/regist/" + loginCache.getKakao_userID());
//        //HttpURLConnection 객체를 생성해 openConnection 메소드로 url 연결
//        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
//        //전송 방식 (POST)
//        httpConn.setRequestMethod("POST");
//        //application/json 형식으로 전송, Request body를 JSON으로 던져줌.
//        httpConn.setRequestProperty("Content-Type", "application/json; utf-8");
//        //Response data를 JSON으로 받도록 설정
//        httpConn.setRequestProperty("Accept", "application/json");
//        //Output Stream을 POST 데이터로 전송
//        httpConn.setDoOutput(true);
//        //json data
//        String jsonInputString = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(json);
//        System.out.println(jsonInputString);
//
//        //JSON 보내는 Output stream
//        try(OutputStream os = httpConn.getOutputStream()) {
//            byte[] input = jsonInputString.getBytes("utf-8");
//            os.write(input, 0, input.length);
//        }
//        httpConn.connect();
//        httpConn.getInputStream().readAllBytes();
//
//
//
//        if (httpConn.getResponseCode() / 100 != 2) throw new Exception();
//        oAuthRegisterCacheRepository.delete(loginCache);
//
//        String accessToken = Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));
//        String refreshToken = Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));
//
//
//        kakaoLoginAccessTokenCacheRepository
//                .save(
//                        KakaoLoginAccessTokenCache
//                                .builder()
//                                .token(accessToken)
//                                .kakao_accessToken(loginCache.getKakao_accessToken())
//                                .kakao_refreshToken(loginCache.getKakao_refreshToken())
//                                .kakao_userID(loginCache.getKakao_userID())
//                                .build()
//                );
//
//        // 연결된 access_token에 대해서만 refresh
//        kakaoLoginRefreshTokenCacheRepository
//                .save(
//                        KakaoLoginRefreshTokenCache
//                                .builder()
//                                .token(refreshToken)
//                                .connected_access_token(accessToken)
//                                .build()
//                );

//        return new ResponseEntity(Map.of(
//                "user-id", loginCache.getKakao_userID(),
//                "access_token", accessToken
//                    , "refresh_token", refreshToken
//        ) , HttpStatus.OK);
//        try {
//        }
//        catch (Throwable e){
//            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
//        }


        return new ResponseEntity("hi",HttpStatus.OK);
    }
}
