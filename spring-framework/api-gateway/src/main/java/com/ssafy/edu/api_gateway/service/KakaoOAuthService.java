package com.ssafy.edu.api_gateway.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.edu.api_gateway.Repository.KakaoLoginAccessTokenCacheRepository;
import com.ssafy.edu.api_gateway.Repository.KakaoLoginRefreshTokenCacheRepository;
import com.ssafy.edu.api_gateway.dto.KakaoLoginAccessTokenCache;
import com.ssafy.edu.api_gateway.dto.KakaoLoginRefreshTokenCache;
import com.ssafy.edu.api_gateway.dto.KakaoRefreshDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Service
public class KakaoOAuthService {

    @Autowired
    KakaoLoginAccessTokenCacheRepository accessTokenCacheRepository;

    @Autowired
    KakaoLoginRefreshTokenCacheRepository refreshTokenCacheRepository;

    ObjectMapper objectMapper = new ObjectMapper();

    public KakaoLoginAccessTokenCache isValidAccess_tokenCache(String token) {
        KakaoLoginAccessTokenCache accessTokenCache = accessTokenCacheRepository.findById(token).orElse(null);

        if (accessTokenCache == null
                 || objectMapper.convertValue(accessTokenCache, Map.class).values().contains(null)) return null;


        return accessTokenCache;
    }

    public KakaoLoginRefreshTokenCache isValidRefresh_tokenCache(String token) {
        KakaoLoginRefreshTokenCache refreshTokenCache = refreshTokenCacheRepository.findById(token).orElse(null);

        if (refreshTokenCache == null
                || objectMapper.convertValue(refreshTokenCache, Map.class).values().contains(null)) return null;

        return refreshTokenCache;
    }

    public Map<String, String> refreshKakaoTokens(String refresh_token, String kakao_cliendID, long kakao_userID) throws Exception {

        KakaoLoginRefreshTokenCache old_refresh_token = refreshTokenCacheRepository.findById(refresh_token).orElse(null);
        KakaoLoginAccessTokenCache old_access_token = accessTokenCacheRepository.findById(old_refresh_token.getConnected_access_token()).orElse(null);

        if (old_access_token == null || old_refresh_token == null){
            if (old_access_token != null) accessTokenCacheRepository.delete(old_access_token);
            if (old_refresh_token != null) refreshTokenCacheRepository.delete(old_refresh_token);

            // 오류 !!
            throw new Exception("No such refresh token or access_token which is connected with refresh_token was deleted");
        }

        // delete my access_token, refresh_token
        accessTokenCacheRepository.delete(old_access_token);
        refreshTokenCacheRepository.delete(old_refresh_token);


        // get kakao access_token, refresh_token
        URL url = UriComponentsBuilder
                .fromHttpUrl("https://kauth.kakao.com/oauth/token")
                .queryParam("grant_type", "refresh_token")
                .queryParam("client_id",kakao_cliendID)
                .queryParam("refresh_token", old_access_token.getKakao_refreshToken())
                .build()
                .toUri().toURL();

        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setRequestMethod("POST");
        httpConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        InputStream responseStream = httpConn.getInputStream();
        String ret = new String(responseStream.readAllBytes());
        System.out.println(ret);

        if (httpConn.getResponseCode() / 100 != 2) throw new Exception();
        Instant curTime = Instant.now();

        Map<String, Object> map = objectMapper.convertValue(ret, Map.class);

        String access_token = UUID.randomUUID().toString();
        refresh_token = UUID.randomUUID().toString();

        KakaoLoginAccessTokenCache accessTokenCache = KakaoLoginAccessTokenCache.builder()
                .token(access_token)
                .kakao_userID(kakao_userID)
                .kakao_accessToken((String) map.get("access_token"))
                .kakao_refreshToken((String) map.get("refresh_token"))
                ._expires_in(curTime.plusSeconds((Integer) map.get("expires_in"))).build();
        accessTokenCacheRepository.save(accessTokenCache);

        KakaoLoginRefreshTokenCache refreshTokenCache = KakaoLoginRefreshTokenCache.builder()
                .token(refresh_token)
                .connected_access_token(access_token)
                ._refresh_token_expires_in(curTime.plusSeconds((Integer) map.get("refresh_token_expires_in"))).build();
        refreshTokenCacheRepository.save(refreshTokenCache);

        return Map.of(
                "access_token", access_token
                , "refresh_token", refresh_token
        );
    }

}
