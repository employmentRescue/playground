package com.ssafy.oauth_service.dto;


import jakarta.annotation.Nonnull;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
@RedisHash(value = "token", timeToLive = 60 * 10)
public class OAuthRegisterCache {
    @Id @Nonnull
    String token;

    long kakao_userID;
    String kakao_accessToken;
    String kakao_refreshToken;
}
