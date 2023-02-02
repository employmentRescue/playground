package com.ssafy.edu.api_gateway.filter;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.edu.api_gateway.Repository.KakaoLoginAccessTokenCacheRepository;
import com.ssafy.edu.api_gateway.Repository.KakaoLoginRefreshTokenCacheRepository;
import com.ssafy.edu.api_gateway.dto.KakaoLoginAccessTokenCache;
import com.ssafy.edu.api_gateway.dto.KakaoLoginRefreshTokenCache;
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


    private static List<String> opend_Endpoints = Arrays.asList(
            "/oauth2/login/kakao",
            "/oauth2/login"
    );

    private static boolean isSecured(ServerWebExchange exchange){
        if (opend_Endpoints == null || opend_Endpoints.isEmpty()) return true;
        return opend_Endpoints.stream().noneMatch(uri -> exchange.getRequest().getURI().getPath().contains(uri));
    }

    Mono<Void> serverResponseCode(ServerWebExchange exchange ,HttpStatus status){
        ServerHttpResponse response = exchange.getResponse();

        response.setStatusCode(status);
        return response.setComplete();
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        if (isSecured(exchange)){

            if (!AuthorizationHeaderContains(exchange)) return serverResponseCode(exchange, HttpStatus.UNAUTHORIZED);

            String token = exchange.getRequest().getHeaders().get("Authorization").get(0).substring("bearer ".length());
            KakaoLoginRefreshTokenCache kakaoLoginRefreshTokenCache = loginRefreshTokenCacheRepository.findById(token).orElse(null);
            KakaoLoginAccessTokenCache kakaoLoginAccessTokenCache = loginAccessTokenCacheRepository.findById(token).orElse(null);


            // access token cache는 kakao_access_token, kakao_refresh_token과 함께 있어야함
            // refresh token는 connected_access_token과 함께 있어야함
            // filter는 refresh token을 새로 발급하지 않는 이상은 cache 데이터를 읽기만 한다.
            if (kakaoLoginAccessTokenCache.getKakao_accessToken() == null || kakaoLoginRefreshTokenCache == null) kakaoLoginAccessTokenCache = null;
            if (kakaoLoginRefreshTokenCache.getConnected_access_token() == null) kakaoLoginRefreshTokenCache = null;


            System.out.println(exchange.getRequest().getHeaders());
            System.out.println(AuthorizationHeaderContains(exchange));

            System.out.println("kakaoLoginAccessTokenCache : " + kakaoLoginAccessTokenCache);
            System.out.println("kakaoLoginRefreshTokenCache : " + kakaoLoginRefreshTokenCache);
            try {

                // refresh token 인 경우
                /// cache에서 refresh token 관련 정보를 가져온다. (if 'instance' null or connected_access_token null: throw exception)
                /// refresh token과 연결된 access token도 캐시에서 가져온다. (if 'instance' null or kakao's access_token null: throw exception)
                /// kakao's access_token이 valid인지 체크한다. (if not valid: throw exception)
                //// 여기까지 오면, kakao's access_token을 새로 발급 --> 전달받은 정보로 객체값 초기화 --> refresh_token, access_token를 UUID로 새로 생성 --> response로 전달.
                if (kakaoLoginRefreshTokenCache != null){
                    kakaoLoginAccessTokenCache = loginAccessTokenCacheRepository
                                                    .findById(kakaoLoginRefreshTokenCache.getConnected_access_token())
                                                    .orElse(null);
                    System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaa");

                    if (kakaoLoginAccessTokenCache.getKakao_accessToken() == null || kakaoLoginRefreshTokenCache == null) throw new Exception();

                    if (!isValid_kakaoAccessToken(kakaoLoginAccessTokenCache.getKakao_accessToken())) throw new Exception();




                    URL url = UriComponentsBuilder
                            .fromHttpUrl("https://kauth.kakao.com/oauth/token")
                            .queryParam("grant_type", "refresh_token")
                            .queryParam("client_id",kakao_cliendID)
                            .build()
                            .toUri().toURL();

                    HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
                    httpConn.setRequestMethod("POST");
                    httpConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                    InputStream responseStream = httpConn.getInputStream();
                    String ret = new String(responseStream.readAllBytes());
                    System.out.println(ret);

                    if (httpConn.getResponseCode() / 100 != 2) throw new Exception();

                    Map<String, Object> map = objectMapper.convertValue(ret, Map.class);
                    System.out.println("kakao tokens Refreshed : " + map);

                    kakaoLoginAccessTokenCache.setKakao_accessToken((String) map.get("access_token"));;
                    if (map.get("refresh_token") != null){
                        kakaoLoginAccessTokenCache.setKakao_refreshToken((String) map.get("refresh_token"));
                    }

                    loginAccessTokenCacheRepository.deleteById(kakaoLoginAccessTokenCache.getToken());
                    loginRefreshTokenCacheRepository.deleteById(kakaoLoginRefreshTokenCache.getToken());
                    kakaoLoginAccessTokenCache.setToken(UUID.randomUUID().toString());
                    kakaoLoginRefreshTokenCache.setToken(UUID.randomUUID().toString());
                    kakaoLoginRefreshTokenCache.setConnected_access_token(kakaoLoginAccessTokenCache.getToken());
                    loginAccessTokenCacheRepository.save(kakaoLoginAccessTokenCache);
                    loginRefreshTokenCacheRepository.save(kakaoLoginRefreshTokenCache);





                    ServerHttpResponse response = exchange.getResponse();

                    response.getHeaders().add("access_token", kakaoLoginAccessTokenCache.getToken());
                    response.getHeaders().add("refresh_token", kakaoLoginRefreshTokenCache.getToken());
                    return response.setComplete();
                }


                // access token 인 경우
                /// cache에서 access token 관련 정보를 가져온다. (if 'instance' null or kakao's access_token null: throw exception)
                /// kakao's access_token이 valid인지 체크한다. (if not valid: throw exception)
                if (!isValid_kakaoAccessToken(kakaoLoginAccessTokenCache.getKakao_accessToken())) throw new Exception();

                // kakao user's id가 null인 경우도 throw exception
                exchange
                        .getRequest()
                        .mutate()
                        .header("userID", String
                                                .valueOf(kakaoLoginAccessTokenCache
                                                        .getKakao_userID()));
            }
            catch (Throwable e){
//                if (kakaoLoginAccessTokenCache != null){
//                    loginRefreshTokenCacheRepository.deleteById(kakaoLoginAccessTokenCache.getToken());
//                    loginAccessTokenCacheRepository.deleteById(kakaoLoginAccessTokenCache.getToken());
//                }
//
//                if (kakaoLoginRefreshTokenCache != null){
//                    loginRefreshTokenCacheRepository.deleteById(kakaoLoginAccessTokenCache.getToken());
//                    loginAccessTokenCacheRepository.deleteById(kakaoLoginAccessTokenCache.getToken());
//                }

                e.printStackTrace();
                return serverResponseCode(exchange, HttpStatus.UNAUTHORIZED);
            }





        }



//        return serverResponseCode(exchange, HttpStatus.UNAUTHORIZED);
//
//
        return chain.filter(exchange);
    }

    private static boolean AuthorizationHeaderContains(ServerWebExchange exchange){
        return
                exchange
                        .getRequest()
                        .getHeaders()
                        .containsKey("Authorization")

                        &&
                        exchange.getRequest().getHeaders().get("Authorization").get(0).substring(0,"Bearer ".length()).equals("Bearer ");
    }

    private boolean isValid_kakaoAccessToken(String access_token){
        try {

            URL url = new URL("https://kapi.kakao.com/v1/user/access_token_info");
            HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
            httpConn.setRequestMethod("GET");
            httpConn.setRequestProperty("Authorization", "Bearer " + access_token);
            InputStream responseStream = httpConn.getInputStream();
            String ret = new String(responseStream.readAllBytes());
            System.out.println(ret);

            return true;
        }
        catch (Throwable e){
            System.out.println("token invalid");

            return false;
        }
    }

}
