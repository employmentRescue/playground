package com.ssafy.oauth_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

//@EnableWebMvc
@EnableDiscoveryClient
@SpringBootApplication
public class OauthServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(OauthServiceApplication.class, args);
    }

}
