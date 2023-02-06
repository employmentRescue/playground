package com.websocket.chat.controller;

import com.websocket.chat.dto.GatheringMessage;
import com.websocket.chat.dto.TeamMessage;
import com.websocket.chat.pubsub.RedisPublisher;
import com.websocket.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatRoomRepository chatRoomRepository;

    @MessageMapping("/chat/TeamMessage")
    public void message(TeamMessage message) {
        if (message.getType().equals("ENTER")){
            chatRoomRepository.enterChatRoom(message.getTeamChatroomId());
            message.setContent(message.getMemberId() + "님이 입장하셨습니다.");
        }
        redisPublisher.teamPublish(chatRoomRepository.getTopic(message.getTeamChatroomId()), message);
    }

    // Todo 1. 여기서 팀 메세지, 모임 메세지 각각 발행.

    @MessageMapping("/chat/GatheringMessage")
    public void message(GatheringMessage message) {
        if (message.getType().equals("ENTER")){
            chatRoomRepository.enterChatRoom(message.getGatheringChatroomId());
            message.setContent(message.getMemberId() + "님이 입장하셨습니다.");
        }
        redisPublisher.gatheringPublish(chatRoomRepository.getTopic(message.getGatheringChatroomId()), message);
    }

}
