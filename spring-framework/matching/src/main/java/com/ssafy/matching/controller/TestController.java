package com.ssafy.matching.controller;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class TestController {
    @RequestMapping("/matching/test")
    public String test() throws Exception {
        System.out.println("MMMMMMMMMMMMMMMMM");
        return "matchingServer - testController 실행";
    }
}
