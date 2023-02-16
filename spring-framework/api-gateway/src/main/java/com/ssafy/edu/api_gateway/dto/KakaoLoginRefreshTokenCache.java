package com.ssafy.edu.api_gateway.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@RedisHash(value = "token", timeToLive = 3600 *24)
public class KakaoLoginRefreshTokenCache {
    @Id
    String token;
    String connected_access_token;
    @JsonIgnore
    Instant _refresh_token_expires_in;
}
