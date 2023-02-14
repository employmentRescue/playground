package com.ssafy.userservice.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        // System.out.println("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        //
        String url = ((HttpServletRequest) req).getRequestURL().toString();
        String queryString = ((HttpServletRequest) req).getQueryString();
        System.out.println(((HttpServletRequest) req).getRequestURL().toString());
        //
        //
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        // response.setHeader("Access-Control-Allow-Origin", "*");

        //
        // response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        // response.setHeader("Access-Control-Allow-Origin",
        // "https://192.168.31.246/oauth2/login/kakao");
        // response.setHeader("Access-Control-Allow-Origins", "*");
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        //
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
        }
        chain.doFilter(req, res);
    }

    @Override
    public void destroy() {

    }
}
