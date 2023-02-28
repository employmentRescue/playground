package com.ssafy.oauth_service.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.annotation.Nonnull;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.time.Instant;

@JsonIgnoreProperties(ignoreUnknown = true)

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
@RedisHash(value = "token" , timeToLive = 3600 * 24 * 31)
public class KakaoLoginAccessTokenCacheForApp {
    @Id @Nonnull
    String token;

    long kakao_userID;
    String kakao_accessToken;
    String kakao_refreshToken;
    Instant _expires_in;
}
