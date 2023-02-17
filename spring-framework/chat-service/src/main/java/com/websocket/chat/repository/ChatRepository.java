package com.websocket.chat.repository;

import com.websocket.chat.dto.ChatMessage;
import com.websocket.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class ChatRepository {

    private final String MessageList = "messageList";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, Integer, ChatMessage> opsHashMessage;
    private HashOperations<String, Integer, List<ChatMessage>> opsHashMessageList;

    @PostConstruct
    private void init() {
        opsHashMessage = redisTemplate.opsForHash();
        opsHashMessageList = redisTemplate.opsForHash();
    }

    public void saveMessage(int roomId, ChatMessage message){
        List<ChatMessage> list = opsHashMessageList.get(MessageList, roomId);
        if(list == null){
            list = new ArrayList<>();
        }
        message.setMessageId(list.size()+1);
        list.add(message);
        opsHashMessageList.put(MessageList, roomId, list);
    }

    public List<ChatMessage> messageList(int roomId){
        return opsHashMessageList.get(MessageList, roomId);
    }

    public void readMessage(long memberId, int roomId, ChatMessage message){
        String stMemberId = Long.toString(memberId);
        List<ChatMessage> messageList = messageList(roomId);
        message.setMessageId(messageList.size());
        opsHashMessage.put(stMemberId, roomId, message);
    }

    public ChatMessage bringMessage(long memberId, int roomId){
        String stMemberId = Long.toString(memberId);
        return opsHashMessage.get(stMemberId, roomId);
    }

    public int unreadMessageNumber(long memberId, int roomId) {
        List<ChatMessage> messageList = messageList(roomId);
        ChatMessage chatMessage = bringMessage(memberId, roomId);
        int unreadMessageNumber = messageList.size() - chatMessage.getMessageId();
        return unreadMessageNumber;
    }
}
