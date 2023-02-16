package com.websocket.chat.service;

import com.websocket.chat.dto.ChatMessage;
import com.websocket.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class ChatServiceImpl implements ChatService{

    private final ChatRepository chatRepository;

    @Override
    public void saveMessage(int roomId, ChatMessage message){
        chatRepository.saveMessage(roomId, message);
    }

    @Override
    public List<ChatMessage> messageList(int roomId) {
        return chatRepository.messageList(roomId);
    }

    @Override
    public void readMessage(long memberId, int roomId, ChatMessage message) {
        chatRepository.readMessage(memberId, roomId, message);
    }

    @Override
    public ChatMessage bringMessage(long memberId, int roomId) {
        return chatRepository.bringMessage(memberId, roomId);
    }

    @Override
    public int unreadMessageNumber(long memberId, int roomId) {
        return chatRepository.unreadMessageNumber(memberId, roomId);
    }


}
