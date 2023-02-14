package com.websocket.chat.service;

import com.websocket.chat.dto.ChatMessage;

import java.util.List;

public interface ChatService {

    void saveMessage(int roomId, ChatMessage message);
    List<ChatMessage> messageList(int roomId);
    void readMessage(long memberId, int roomId, ChatMessage message);
    ChatMessage bringMessage(long memberId, int roomId);

}
