package com.ssafy.teammatching;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
public class TeamMatchingApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeamMatchingApplication.class, args);
    }

}
