//package com.websocket.chat.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Profile;
//import org.springframework.data.redis.connection.RedisServer;
//import redis.embedded.RedisServer;
//
//import javax.annotation.PostConstruct;
//import javax.annotation.PreDestroy;
//
//@Profile("alpha")
//@Configuration
//public class EmbeddedRedisConfig {
//
//    @Value("${spring.redis.port}")
//    private int redisPort;
//
//    private RedisServer redisServer;
//
//    @PostConstruct
//    public void redisServer(){
//        redisServer = new RedisServer("localhost", redisPort);
//        redisServer.start();
//    }
//
//    @PreDestroy
//    public void stopRedis(){
//        if(redisServer != null){
//            redisServer.stop();
//        }
//    }
//
//}
