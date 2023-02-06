package com.ssafy.oauth_service.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class testController_node {
    @RequestMapping("/src/main.tsx")
    @ResponseBody
    String hello(){
        return "Hello World";
    }
}
