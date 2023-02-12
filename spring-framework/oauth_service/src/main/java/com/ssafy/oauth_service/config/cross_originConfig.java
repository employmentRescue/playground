package com.ssafy.oauth_service.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
public class cross_originConfig implements WebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        System.out.println("cccccccccccccccccccccccccccccccccc");

        ServerHttpResponse response = exchange.getResponse();

        response.getHeaders().add("Access-Control-Allow-Origins", "*");
        response.getHeaders().add("Access-Control-Allow-Credentials", "true");
        response.getHeaders().add("Access-Control-Allow-Methods","*");
        response.getHeaders().add("Access-Control-Max-Age", "3600");
        response.getHeaders().add("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//        response.getHeaders().add("", "");
//        response.getHeaders().add("", "");
//        response.getHeaders().add("", "");
//        response.getHeaders().add("", "");
//        response.getHeaders().add("", "");
//        response.getHeaders().add("", "");


        response.setComplete();

        System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaa");

        return chain.filter(exchange);
//        if("OPTIONS".equalsIgnoreCase(exchange.getRequest().getMethod()..toString()) {
//            response.setStatusCode(HttpStatusCode.valueOf(HttpServletResponse.SC_OK));
//            return response.setComplete();
//        }else {
//            return chain.filter(exchange);
//        }

//        response.setComplete()
//
//        return chain.filter(exchange);
    }
}
