package com.ssafy.teammatching.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/team")
public class TestController {
    @GetMapping("/test")
    public String test() {
        return "team-matching server - hello";
    }
}
