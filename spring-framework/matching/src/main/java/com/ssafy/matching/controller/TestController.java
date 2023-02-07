package com.ssafy.matching.controller;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/test")
public class TestController {
    @GetMapping("")
    public String test() throws Exception {
        return "matchingServer -     testController 실행";
    }
}
