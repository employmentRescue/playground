package com.ssafy.edu.api_gateway.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.annotation.Nonnull;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@JsonIgnoreProperties(ignoreUnknown = true)

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
@RedisHash(value = "token" , timeToLive = 3600 * 24)
public class KakaoLoginAccessTokenCache {
    @Id @Nonnull
    String token;

    long kakao_userID;
    String kakao_accessToken;
    String kakao_refreshToken;
}
