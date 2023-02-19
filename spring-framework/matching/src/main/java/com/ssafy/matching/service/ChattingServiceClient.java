package com.ssafy.matching.service;

import feign.Headers;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(name = "chat", url = "https://i8b309.p.ssafy.io/chat")
public interface ChattingServiceClient {

    @PostMapping("/GatheringChatRoom")
    String createGatheringChatRoom(@RequestBody Map<String, Object> map);

    @PostMapping("/TeamChatRoom")
    @Headers(value = "Content-Type: application/json")
    String createTeamChatRoom(@RequestBody Map<String, Object> map);
}
