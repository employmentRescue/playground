package com.ssafy.userservice;

import org.springdoc.core.annotations.RouterOperation;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@EnableWebMvc
@EnableJpaAuditing // DB created, modify 시간 자동 입력
@SpringBootApplication
public class UserServiceApplication {


    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }

}
