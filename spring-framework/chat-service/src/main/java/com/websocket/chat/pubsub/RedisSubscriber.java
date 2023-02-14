package com.websocket.chat.pubsub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.websocket.chat.dto.ChatMessage;
import com.websocket.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatRepository chatRepository;



    //Todo 3. 여기가 이제 애매한데 onMessage 메소드 내에서 팀 메세지, 운동 메세지 파악. 클래스도 뜯어보기.
    // 그리고 onMessage 내에서 파라미터로 받는 Message 는 뭐야 레거시 뜯어보기. 아 나는 파라미터 인자를 team 또는 gathering
    // 메세지로 치환


    /*
        Redis에서 메세지가 발행(pub)되면
        대기하고 있던 onMessage가 해당 메세지를 처리한다.
   */
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            // redis에서 발행된 데이터를 받아 deserialize
            String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            // ChatMessage 객체로 맵핑
            ChatMessage chatMessage = objectMapper.readValue(publishMessage, ChatMessage.class);
            // Websocket 구독자에게 채팅 메세지 send
            messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessage.getChatroomId(), chatMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }

    }
}


/*
    onMessage 메소드는 리스너에 수신된 메시지를 각 비즈니스 로직을 거쳐
    messagingTemplate을 이용해 WebSocket 구독자들에게 메시지를 전달하는 메소드이다.

    Redis로부터 온 메시지를 역직렬화하여
    ChatMessage DTO로 전환뒤 필요한 정보와 함께 메시지를 전달한다.
*/
