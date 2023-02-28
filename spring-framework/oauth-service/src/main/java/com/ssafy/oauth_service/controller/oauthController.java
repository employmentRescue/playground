package com.ssafy.oauth_service.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.oauth_service.Repository.KakaoLoginAccessTokenCacheRepository;
import com.ssafy.oauth_service.Repository.KakaoLoginRefreshTokenCacheRepository;
import com.ssafy.oauth_service.Repository.OAuthRegisterCacheRepository;
import com.ssafy.oauth_service.Repository.RegisterCodeCacheRepository;
import com.ssafy.oauth_service.dto.*;
import com.ssafy.oauth_service.service.kakaoOauthService;
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
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/oauth2")
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


    @Value("${oauth2.client.registration.client-id.kakao}")
    String kakao_cliendID;


    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    OAuthRegisterCacheRepository oAuthRegisterCacheRepository;

    @Autowired
    RegisterCodeCacheRepository registerCodeCacheRepository;

    @Autowired
    kakaoOauthService kakao_oauthService;

    @Value("${oauth2.api_gateway_url}")
    private String api_gateway_url;






    @RequestMapping(value = {/*"/login/kakao",*/ "/app/login/kakao", "/web/login/kakao"})
    String redirectTologin(HttpServletRequest req) throws MalformedURLException {
        String reqPath = (String) req.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);

        System.out.println(reqPath.equals("/app/login/kakao"));
        System.out.println(api_gateway_url + "/oauth2" + (reqPath.equals("/oauth2/app/login/kakao") ? "/app/login" : "/web/login"));

        return "redirect:" + "https://kauth.kakao.com/oauth/authorize?" +
                "response_type=code&client_id=" + kakao_cliendID +
                "&redirect_uri=" +
                api_gateway_url
//                "https://localhost:8080"
                + "/oauth2" + (reqPath.equals("/oauth2/app/login/kakao") ? "/app/login" : "/web/login"); // 내 서버로 redirect 해서 kakao access_token, kakao refresh_token 받음
        // <- 나중에 naver도 합치면 @RequestMapping("/login/{provider}")로 하면 될듯.
    }


    @Transactional
    @RequestMapping(value = {/*"/login",*/ "/app/login", "/web/login"})
    String login(@RequestParam Map<String, Object> map, HttpServletRequest req) throws Throwable
    {
        System.out.println("login : " + map);
        if (map.isEmpty() || !map.containsKey("code")) return "redirect:" + api_gateway_url +  "/login/fail";

        String code = (String) map.get("code");

        String reqPath = (String) req.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
        boolean isAppLogin = reqPath.equals("/oauth2/app/login");

        KakaoTokenByCodeDTO codeResult = kakao_oauthService.getKakaoToken(kakao_cliendID, api_gateway_url, code, isAppLogin);
        Instant curTime = Instant.now();



        // access_token으로 사용자 정보 받기
        KakaoUserInfoDTO userinfo = kakao_oauthService.getUserInfo(kakao_cliendID, api_gateway_url, codeResult.getAccess_token());


        if (entityManager.find(MemberOftenEntity.class, userinfo.getId()) != null){
            Map<String, String> tokens = kakao_oauthService.login(userinfo.getId(), codeResult.getAccess_token(), codeResult.getRefresh_token(), curTime.plusSeconds(codeResult.getExpires_in()), curTime.plusSeconds(codeResult.getRefresh_token_expires_in()), isAppLogin);

            System.out.println("tokens : " + tokens.get("access_token_for_app"));

            return "redirect:"
//                    + "https://localhost:3000"
                    + api_gateway_url
                    + "/login/success?"
                    + "access_token=" + tokens.get("access_token")
                    + "&refresh_token=" + tokens.get("refresh_token")
                    + "&user_id=" + userinfo.getId()

                    + (isAppLogin?"&access_token_for_app=" + tokens.get("access_token_for_app"):"");

        }
        else {
            RegisterCodeCache registerCodeCache =  registerCodeCacheRepository.findById(userinfo.getId()).orElse(null);
            if (registerCodeCache != null){
                OAuthRegisterCache oAuthRegisterCache = oAuthRegisterCacheRepository.findById(registerCodeCache.getRegister_code()).orElse(null);

                if (oAuthRegisterCache != null) oAuthRegisterCacheRepository.delete(oAuthRegisterCache);
                registerCodeCacheRepository.delete(registerCodeCache);
            }

            String registerCode = Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));

            OAuthRegisterCache registerCache = OAuthRegisterCache
                                            .builder()
                                            .token(registerCode)
                                            .kakao_userID(userinfo.getId())
                                            .kakao_accessToken(codeResult.getAccess_token())
                                            .kakao_refreshToken(codeResult.getRefresh_token())
                                            ._expires_in(curTime.plusSeconds(codeResult.getExpires_in()))
                                            ._refresh_token_expires_in(curTime.plusSeconds(codeResult.getRefresh_token_expires_in()))
                                            .build();

            registerCodeCache = RegisterCodeCache.builder().kakao_userID(userinfo.getId()).register_code(registerCode).build();

            oAuthRegisterCacheRepository.save(registerCache);
            registerCodeCacheRepository.save(registerCodeCache);



            System.out.println(registerCache);


            return "redirect:"
//                    + "https://localhost:3000"
                    + api_gateway_url
                    + "/login/regist?code=" + registerCache.getToken();
        }

    }

    @Transactional
    @RequestMapping("/regist")
    ResponseEntity regist(String code, @RequestBody Map<String, Object> json/**/) throws Exception {
        System.out.println(json);

        System.out.println(code);
        OAuthRegisterCache loginCache = oAuthRegisterCacheRepository.findById(code).orElse(null);
        System.out.println("regist : " + loginCache);
        if (loginCache == null || code == null || code.isEmpty()) return new ResponseEntity(HttpStatus.BAD_REQUEST);




        //JSON 데이터 받을 URL 객체 생성
//        URL url = new URL (api_gateway_url + "/user/regist/" + loginCache.getKakao_userID());
        URL url = new URL (api_gateway_url   /*"http://localhost:9000"*/ + "/user/regist/" + loginCache.getKakao_userID());
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
        String jsonInputString = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(json);
        System.out.println(jsonInputString);

        //JSON 보내는 Output stream
        try(OutputStream os = httpConn.getOutputStream()) {
            byte[] input = jsonInputString.getBytes("utf-8");
            os.write(input, 0, input.length);
        }
        httpConn.connect();
        httpConn.getInputStream().readAllBytes();




        if (httpConn.getResponseCode() / 100 != 2) throw new Exception();
        oAuthRegisterCacheRepository.delete(loginCache);

        RegisterCodeCache registerCodeCache =  registerCodeCacheRepository.findById(loginCache.getKakao_userID()).orElse(null);
        if (registerCodeCache != null) registerCodeCacheRepository.delete(registerCodeCache);

        System.out.println("regist - deleted : " + loginCache + " " + registerCodeCache);
//        Map<String, String> tokens = kakao_oauthService.login(loginCache.getKakao_userID(), loginCache.getKakao_accessToken(), loginCache.getKakao_refreshToken(), loginCache.get_expires_in(), loginCache.get_refresh_token_expires_in(), false);



        try {
        }
        catch (Throwable e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }


        return new ResponseEntity(/*Map.of(
                "access_token", tokens.get("access_token")
                , "refresh_token", tokens.get("refresh_token")
                , "user_id", loginCache.getKakao_userID()
        ) , */HttpStatus.OK);
    }
}
