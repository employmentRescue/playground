package com.ssafy.oauth_service.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
@RedisHash(value = "kakao_userID", timeToLive = 3600 *24)
public class KakaoTokensList {
    @Id @NonNull
    Long kakao_userID;

    String access_token;
    String access_token_for_app;
    String refresh_token;
}
