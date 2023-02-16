package com.ssafy.edu.api_gateway.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.edu.api_gateway.Repository.KakaoLoginAccessTokenCacheRepository;
import com.ssafy.edu.api_gateway.Repository.KakaoLoginRefreshTokenCacheRepository;
import com.ssafy.edu.api_gateway.dto.KakaoLoginAccessTokenCache;
import com.ssafy.edu.api_gateway.dto.KakaoLoginRefreshTokenCache;
import com.ssafy.edu.api_gateway.service.KakaoOAuthService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.ErrorResponse;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
public class AuthentificationGatewayFilter implements WebFilter {

    @Value("${oauth2.client.registration.client-id.kakao}")
    String kakao_cliendID;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    KakaoLoginAccessTokenCacheRepository loginAccessTokenCacheRepository;

    @Autowired
    KakaoLoginRefreshTokenCacheRepository loginRefreshTokenCacheRepository;

    @Autowired
    KakaoOAuthService kakao_oauth_service;

    private static List<String> opend_Endpoints = Arrays.asList(
            "/oauth2/login/kakao",
            "/oauth2/login");
    private static List<String> opend_Endpoints2 = Arrays.asList(

    );

    private static boolean isSecured(ServerWebExchange exchange) {
        if (opend_Endpoints == null || opend_Endpoints.isEmpty())
            return true;

        return opend_Endpoints.stream().noneMatch(uri -> exchange.getRequest().getURI().getPath().contains(uri));

    }

    Mono<Void> serverResponseCode(ServerWebExchange exchange, HttpStatus status) {
        ServerHttpResponse response = exchange.getResponse();

        response.setStatusCode(status);
        return response.setComplete();
    }

    @SneakyThrows
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        System.out.println("api-gateway routes for : " + exchange.getRequest().getPath());


        if (AuthorizationHeaderContains(exchange)){
            String token = exchange.getRequest().getHeaders().get("Authorization").get(0).substring("bearer ".length());
            KakaoLoginAccessTokenCache accessTokenCache = kakao_oauth_service.isValidAccess_tokenCache(token);
            System.out.println(token);
            System.out.println(accessTokenCache);

            if (kakao_oauth_service.isValidAccess_tokenCache(token) != null) {
                exchange.getRequest()
                        .mutate()
                        .header("x-forwarded-for-user-id", String.valueOf(accessTokenCache.getKakao_userID()));
            }
        }


        // 잠시풀래..
        // if
        // (exchange.getRequest().getHeaders().containsKey("x-forwarded-for-user-id")){
        // return serverResponseCode(exchange, HttpStatus.BAD_REQUEST);
        // }


//        if (isSecured(exchange)){
//
//            // if (!AuthorizationHeaderContains(exchange)) return serverResponseCode(exchange, HttpStatus.UNAUTHORIZED);
//
//            String token = exchange.getRequest().getHeaders().get("Authorization").get(0).substring("bearer ".length());
//
//            KakaoLoginAccessTokenCache accessTokenCache = kakao_oauth_service.isValidAccess_tokenCache(token);
//            KakaoLoginRefreshTokenCache refreshTokenCache = kakao_oauth_service.isValidRefresh_tokenCache(token);
//
//            System.out.println("access : " + accessTokenCache);
//            System.out.println("refresh : " + refreshTokenCache);
//
//
////            if (accessTokenCache == null && refreshTokenCache == null) return serverResponseCode(exchange, HttpStatus.UNAUTHORIZED);
//
//            if (accessTokenCache != null) {
//                exchange.getRequest()
//                        .mutate()
//                        .header("x-forwarded-for-user-id", String.valueOf(accessTokenCache.getKakao_userID()));
//            }
//
////            if (refreshTokenCache != null) {
////                accessTokenCache = loginAccessTokenCacheRepository.findById(refreshTokenCache.getConnected_access_token()).orElse(null);
////
////
////
////
////                ServerHttpResponse response = exchange.getResponse();
////
////                kakao_oauth_service.refreshKakaoTokens(token, kakao_cliendID, accessTokenCache.getKakao_userID());
//////                System.out.println("refresh token is fired.");
//////                response.getHeaders().add("access_token", tokens.get("access_token"));
//////                response.getHeaders().add("refresh_token", tokens.get("refresh_token"));
////
////                return response.setComplete();
////            }
//
//
//        }



        return chain.filter(exchange);
    }

    private static boolean AuthorizationHeaderContains(ServerWebExchange exchange) {
        return exchange
                .getRequest()
                .getHeaders()
                .containsKey("Authorization")

                &&
                exchange.getRequest().getHeaders().get("Authorization").get(0).substring(0, "Bearer ".length())
                        .equals("Bearer ");
    }

}
