package com.ssafy.oauth_service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.oauth_service.Repository.KakaoLoginAccessTokenCacheRepository;
import com.ssafy.oauth_service.Repository.KakaoLoginRefreshTokenCacheRepository;
import com.ssafy.oauth_service.Repository.OAuthRegisterCacheRepository;
import com.ssafy.oauth_service.dto.KakaoLoginAccessTokenCache;
import com.ssafy.oauth_service.dto.KakaoLoginRefreshTokenCache;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

@SpringBootTest
class OauthServiceApplicationTests {

    @Autowired
    OAuthRegisterCacheRepository oAuthRegisterCacheRepository;

    @Autowired
    KakaoLoginAccessTokenCacheRepository loginAccessTokenCacheRepository;

    @Autowired
    KakaoLoginRefreshTokenCacheRepository loginRefreshTokenCacheRepository;


    @Value("${oauth2.client.registration.client-id.kakao}")
    String kakao_cliendID;

    @Test
    void contextLoads() throws Exception {
//        System.out.println(oAuthRegisterCacheRepository.findById("OTFjYTM1ODEtZjUyZC00YTkxLTgxMDgtMjVlNjgzMDc4YWFj"));
        ObjectMapper objectMapper = new ObjectMapper();

        URL url = new URL("http://localhost:9000/user/regist/" + 1234);
        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setRequestMethod("GET");

        String userData = "{\"nickname\":\"nickname\", \"name\":\"bannana\", \"prefer_time\":\"12-21\"}";
        if (userData != null && userData.length() > 0)
        {
            httpConn.setRequestProperty("Content-Type", "application/json; utf-8");
            httpConn.setDoOutput(true); //OutputStream을 사용해서 post body 데이터 전송

            OutputStream os = httpConn.getOutputStream();
            os.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(userData).getBytes(StandardCharsets.UTF_8));
            System.out.println("userData -> " + objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(userData));

            httpConn.connect();
        }
        System.out.println(new String(httpConn.getInputStream().readAllBytes()));

    }


    String access_token = "isiUxNyvwt2sXwjDEhmTxqyRmaMlL3ROKTrW5EquCisNHgAAAYYNcC6F";
    String refresh_token = "0sEUoIcwZTL2lTUHnXmq3VTbwanwJDQu5dMMCGUACisNHgAAAYYNcC6E";

    @Test
    void access_tokenCheck() throws Exception {
        try {

            URL url = new URL("https://kapi.kakao.com/v1/user/access_token_info");
            HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
            httpConn.setRequestMethod("GET");
            httpConn.setRequestProperty("Authorization", "Bearer " + access_token);
            InputStream responseStream = httpConn.getInputStream();
            String ret = new String(responseStream.readAllBytes());
            System.out.println(ret);
        }
        catch (Throwable e){
            System.out.println("token invalid");
        }
    }

    @Test
    void refresh_token_getAgain() throws Exception {
        URL url = UriComponentsBuilder
                .fromHttpUrl("https://kauth.kakao.com/oauth/token")
                .queryParam("grant_type", "refresh_token")
                .queryParam("client_id",kakao_cliendID)
                .queryParam("refresh_token","ZDY1MDRmZDgtOWM4NC00ZDQwLTk5ODYtM2Q5ZmE5ZDk1MWY0")
                .build()
                .toUri().toURL();

        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setRequestMethod("POST");
        httpConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        InputStream responseStream = httpConn.getInputStream();
        String ret = new String(responseStream.readAllBytes());
        System.out.println(ret);
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.convertValue(ret, Map.class);

    }

    @Test
    void logout(){

    }

}


/*
HTTP HEADER(When oau
X-Forwarded-Login : kakao's is





- 발급받은 access_token을 유효한지 kakao에게 물어보기
<- access_token은 캐시에 있음. 만약 캐시에 없다면 로그아웃 된 상태로 설정

- access_token이 유효하다면, 캐시로부터 사용자 id를 받아와서 url에 붙히기, 그 후에 다음 필터로 넘기기

- access_token이 유효하지 않다면 요청 거절(다음 필터로 넘기지 말기)

- 로그아웃(access_token 및 refresh_token 삭제 <- 캐시만 삭제. 카카오는 내비둬)

- refresh token 발급

- api gateway 연결하기
+ docker에 넣는거도 하기

- ssl 붙히기(얘는 ...오늘안에 할수있니...?)

 */