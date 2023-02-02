package com.ssafy.oauth_service.dto;

import lombok.*;

import java.util.Date;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class KakaoUserInfoDTO {
    long id;
    boolean has_signed_up;
    Date connected_at;
    Date synched_at;
    Map<String, Object> properties;
    Map<String, Object> kakao_account;
}
