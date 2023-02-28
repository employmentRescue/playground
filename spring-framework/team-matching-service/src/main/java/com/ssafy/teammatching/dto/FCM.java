package com.ssafy.teammatching.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class FCM {
    private String title; //알림의 제목
    private String body; //알림의 내용
    private List<String> token_list; //메세지를 받을 사용자 token 목록
    private Map<String, String> data;

    @Builder
    public FCM(String title, String body, List<String> token_list, Map<String, String> data) {
        this.title = title;
        this.body = body;
        this.token_list = token_list;
        this.data = data;
    }
}
