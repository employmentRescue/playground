package com.ssafy.fcmservice;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.List;
import java.util.Map;
import java.util.Set;


@JsonIgnoreProperties(ignoreUnknown = true)

@ToString
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class fcmDTO {
    String title;
    String body;
    List<String> token_list;
    Map<String, String> data;
}
