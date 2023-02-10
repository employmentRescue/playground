package com.websocket.chat.pubsub;

import com.websocket.chat.dto.Gathering;
import com.websocket.chat.dto.GatheringMessage;
import com.websocket.chat.dto.TeamMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;


    //Todo 2. publish 메소드 1개 더만들어서 팀 메세지, 모임 메세지 나눠서 처리.
    // convertAndSend 메소드 뜯어보기. 이렇게 보내면 어디로 전송 되는 것인지 파악.
    // 여기의 redisTemplate 은 topic 을 받는데 그럼 기존대로 String 이 맞는 건지 파악.
    public void teamPublish(ChannelTopic topic, TeamMessage message) {
        redisTemplate.convertAndSend(topic.getTopic(), message);
    }

    public void gatheringPublish(ChannelTopic topic, GatheringMessage message) {
        redisTemplate.convertAndSend(topic.getTopic(), message);
    }

}
