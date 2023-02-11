package com.ssafy.edu.api_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class RouteConfig {
    @Bean
    public List<String> Open_Endpoints(){
        return Arrays.asList(
                "/oauth2/login1"
        );
    }
}
