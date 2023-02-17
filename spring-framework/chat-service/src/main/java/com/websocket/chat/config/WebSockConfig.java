package com.websocket.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSockConfig implements WebSocketMessageBrokerConfigurer { // (1)

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) { // (2)
        config.enableSimpleBroker("/sub"); // (3)
        config.setApplicationDestinationPrefixes("/pub"); // (4)
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) { // (5)
        registry.addEndpoint("/ws-stomp").setAllowedOriginPatterns("*")
                .withSockJS();
    }
}

/*
(1) WebSocketMessageBrokerConfigurer를 상속받아 STOMP로 메시지 처리 방법을 구성한다.

(2) configureMessageBroker에서는 메시지를 중간에서 라우팅할 때 사용하는 메시지 브로커를 구성한다.

(3) enableSimpleBroker에서는 해당 주소를 구독하는 클라이언트에게 메시지를 보낸다. 즉, 인자에는 구독 요청의 prefix를 넣고,
    클라이언트에서 1번 채널을 구독하고자 할 때는 /sub/1 형식과 같은 규칙을 따라야 한다.

(4) setApplicationDestinationPrefixes에는 메시지 발행 요청의 prefix를 넣는다. 즉, /pub로 시작하는 메시지만 해당 Broker에서 받아서 처리한다.

(5) 클라이언트에서 WebSocket에 접속할 수 있는 endpoint를 지정한다.

*/