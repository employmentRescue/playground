package com.ssafy.oauth_service.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class KakaoTokenByCodeDTO {
    String token_type;
    String access_token;
    String id_token;
    int expires_in;
    String refresh_token;
    int refresh_token_expires_in;
    String scope;
}
