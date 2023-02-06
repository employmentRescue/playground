package com.ssafy.edu.api_gateway;

import com.ssafy.edu.api_gateway.Repository.KakaoLoginAccessTokenCacheRepository;
import com.ssafy.edu.api_gateway.Repository.KakaoLoginRefreshTokenCacheRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ApiGatewayApplicationTests {

    @Autowired
    KakaoLoginAccessTokenCacheRepository loginAccessTokenCacheRepository;

    @Autowired
    KakaoLoginRefreshTokenCacheRepository loginRefreshTokenCacheRepository;

    @Test
    void contextLoads() {
        System.out.println(loginAccessTokenCacheRepository.findById("YTU5NTM2ZTQtNjQ2OS00Mzk3LWIyNGMtZDU4MWZiMmE4ZjM2"));
    }

}
