package com.ssafy.edu.api_gateway;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ServerWebExchange;

@Controller
public class testController {
    @RequestMapping("/test")
    @ResponseBody
    String hello(@RequestHeader String userID){
        System.out.println(userID);

        return "hello world";
    }
}
