package com.ssafy.oauth_service.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.oauth_service.Repository.KakaoLoginAccessTokenCacheForAppRepository;
import com.ssafy.oauth_service.Repository.KakaoLoginAccessTokenCacheRepository;
import com.ssafy.oauth_service.Repository.KakaoLoginRefreshTokenCacheRepository;
import com.ssafy.oauth_service.dto.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;
import java.util.UUID;

@Service
public class kakaoOauthService {

    ObjectMapper objectMapper;

    KakaoLoginAccessTokenCacheRepository kakaoLoginAccessTokenCacheRepository;

    KakaoLoginAccessTokenCacheForAppRepository kakaoLoginAccessTokenCacheForAppRepository;

    KakaoLoginRefreshTokenCacheRepository kakaoLoginRefreshTokenCacheRepository;

    @Autowired
    kakaoOauthService(ObjectMapper objectMapper, KakaoLoginAccessTokenCacheRepository kakaoLoginAccessTokenCacheRepository, KakaoLoginAccessTokenCacheForAppRepository kakaoLoginAccessTokenCacheForAppRepository, KakaoLoginRefreshTokenCacheRepository kakaoLoginRefreshTokenCacheRepository){
        this.objectMapper = objectMapper;
        this.kakaoLoginAccessTokenCacheRepository = kakaoLoginAccessTokenCacheRepository;
        this.kakaoLoginAccessTokenCacheForAppRepository = kakaoLoginAccessTokenCacheForAppRepository;
        this.kakaoLoginRefreshTokenCacheRepository = kakaoLoginRefreshTokenCacheRepository;
    }

    public KakaoTokenByCodeDTO getKakaoToken(String kakao_cliendID, String api_gateway_url, String code, boolean isAppLogin) throws IOException {
        // oauth code를 이용해서 access_token, refresh_token 받기
        URL url = new URL("https://kauth.kakao.com/oauth/token?" +
                "grant_type=authorization_code" +
                "&client_id=" + kakao_cliendID +
                "&redirect_uri=" + URLEncoder.encode(api_gateway_url /*"https://localhost:8080"*/ + "/oauth2" + (isAppLogin ? "/app/login" : "/web/login"), StandardCharsets.UTF_8) +
                "&code=" + code //(String) map.get("code")
        );

        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setRequestMethod("POST");
        httpConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

        InputStream responseStream = httpConn.getInputStream();
        KakaoTokenByCodeDTO codeResult = objectMapper.readValue(responseStream, KakaoTokenByCodeDTO.class);


        return codeResult;
    }

    public KakaoUserInfoDTO getUserInfo(String kakao_cliendID, String api_gateway_url, String kakao_accessToken) throws Exception {
        // access_token으로 사용자 정보 받기
        URL url = new URL("https://kapi.kakao.com/v2/user/me");
        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setRequestMethod("POST");
        httpConn.setRequestProperty("Authorization", "Bearer " + kakao_accessToken);
        InputStream responseStream = httpConn.getInputStream();
        String ret = new String(responseStream.readAllBytes());
        System.out.println(ret);

        KakaoUserInfoDTO userinfo = objectMapper.readValue(ret, KakaoUserInfoDTO.class);

        return userinfo;
    }

    public Map<String, String> login(long kakao_userID, String kakao_accessToken, String kakao_refreshToken, Instant _expires_in, Instant _refresh_token_expires_in, boolean isApp) {
        String accessToken = Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));
        String accessTokenForApp = Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));
        String refreshToken = Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));


        if (isApp){
            kakaoLoginAccessTokenCacheForAppRepository
                    .save(
                            KakaoLoginAccessTokenCacheForApp
                                    .builder()
                                    .token(accessTokenForApp)
                                    .kakao_accessToken(kakao_accessToken)
                                    .kakao_refreshToken(kakao_refreshToken)
                                    .kakao_userID(kakao_userID)
                                    ._expires_in(_expires_in)
                                    .build()
                    );
        }

        kakaoLoginAccessTokenCacheRepository
                .save(
                        KakaoLoginAccessTokenCache
                                .builder()
                                .token(accessToken)
                                .kakao_accessToken(kakao_accessToken)
                                .kakao_refreshToken(kakao_refreshToken)
                                .kakao_userID(kakao_userID)
                                ._expires_in(_expires_in)
                                .build()
                );

        // 연결된 access_token에 대해서만 refresh
        kakaoLoginRefreshTokenCacheRepository
                .save(
                        KakaoLoginRefreshTokenCache
                                .builder()
                                .token(refreshToken)
                                .connected_access_token(accessToken)
                                ._refresh_token_expires_in(_refresh_token_expires_in)
                                .build()
                );

        System.out.println("login - access_token : " + KakaoLoginAccessTokenCache
                .builder()
                .token(accessToken)
                .kakao_accessToken(kakao_accessToken)
                .kakao_refreshToken(kakao_refreshToken)
                .kakao_userID(kakao_userID)
                ._expires_in(_expires_in)
                .build());

        System.out.println("login - refresh_token : " + KakaoLoginRefreshTokenCache
                .builder()
                .token(refreshToken)
                .connected_access_token(accessToken)
                ._refresh_token_expires_in(_refresh_token_expires_in)
                .build());

        return Map.of(
                "access_token", accessToken,
                "refresh_token", refreshToken,
                "access_token_for_app", accessTokenForApp
        );
    }
}
