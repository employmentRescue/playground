package com.websocket.chat.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(host, port);
    }

    /*
        redis pub/sub 메세지를 처리하는 listner 설정
    */

    @Bean
    public RedisMessageListenerContainer redisMessageListener(RedisConnectionFactory connectionFactory){ // (1)
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        return container;
    }

    /*
        어플리케이션에서 사용할 redisTemplate 설정
    */

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory){ // (3)
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(connectionFactory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
        return redisTemplate;
    }
}

/*
    (1) RedisMessageListenerContainer는 Redis Channel(Topic)로 부터 메시지를 받고,
        주입된 리스너들에게 비동기적으로 dispatch 하는 역할을 수행하는 컨테이너이다.
        즉, 발행된 메시지 처리를 위한 리스너들을 설정할 수 있다.

    (3) Redis서버와 상호작용하기 위한 RedisTemplate 관련 설정을 해준다.
        Redis 서버에는 bytes 코드만이 저장되므로 key와 value에 Serializer를 설정해준다.
        Json 포맷 형식으로 메시지를 교환하기 위해 ValueSerializer에 Jackson2JsonRedisSerializer로 설정해준다.
*/