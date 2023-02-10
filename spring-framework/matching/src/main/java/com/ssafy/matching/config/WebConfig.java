package com.ssafy.matching.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*", "https://localhost:3000", "https://i8b309.p.ssafy.io", "https://100.100.2.144:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .maxAge(3000);
    }
}
