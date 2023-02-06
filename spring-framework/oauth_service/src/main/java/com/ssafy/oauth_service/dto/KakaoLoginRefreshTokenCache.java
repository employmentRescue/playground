package com.ssafy.oauth_service.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@RedisHash(value = "token", timeToLive = 3600 *24)
public class KakaoLoginRefreshTokenCache {
    @Id
    String token;
    String connected_access_token;
}
