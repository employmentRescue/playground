package com.ssafy.edu.api_gateway.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@JsonIgnoreProperties(ignoreUnknown = true)


@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@ToString
public class KakaoRefreshDTO {
    String token_type;
    String access_token;
    String id_token;
    Integer expires_in;
    String refresh_token;
    Integer refresh_token_expires_in;
}
