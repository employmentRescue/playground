package com.websocket.chat.controller;

import com.websocket.chat.dto.ChatMessage;
import com.websocket.chat.pubsub.RedisPublisher;
import com.websocket.chat.repository.ChatRoomRepository;
import com.websocket.chat.service.ChatService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "채팅 메세지")
@RequiredArgsConstructor
@RestController
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatService chatService;
    private final ChatRoomRepository chatRoomRepository;

    private static final String SUCCESS = "success";

    /*
        websocket "/pub/chat/message" 로 들어오는 메세징을 처리한다.
    */
    @MessageMapping("/chat/Message")
    public void message(ChatMessage message) {
        if (message.getType().equals("ENTER")){
            String roomId = Integer.toString(message.getChatroomId());
            chatRoomRepository.enterChatRoom(roomId);
            message.setContent(message.getMemberId() + "님이 입장하셨습니다.");
            System.out.println("ENTER 타입으로 입장");
        }
        if(!message.getType().equals("ENTER"))
            redisPublisher.messagePublish(chatRoomRepository.getTopic(message.getChatroomId()), message);

        if(!message.getType().equals("ENTER")){
            chatService.saveMessage(message.getChatroomId(), message);

        }
    }

    @ApiOperation(value = "채팅방 모든 메세지 출력", notes = "해당 채팅방의 모든 메세지를 가져온다.")
    @GetMapping("/chat/messageList/{roomId}")
    public ResponseEntity<List<ChatMessage>> messageList(@PathVariable int roomId){
        return new ResponseEntity<>(chatService.messageList(roomId), HttpStatus.OK);
    }

    @ApiOperation(value = "채팅방의 마지막 메세지 읽음 처리", notes = "해당 채팅방에서 읽은 마지막 메세지를 읽음으로 등록한다.")
    @PostMapping("/chat/readMessage/{roomId}")
    public ResponseEntity<String> readMessage(@RequestParam long memberId, @PathVariable int roomId, @RequestBody ChatMessage message){
        chatService.readMessage(memberId, roomId, message);
        return new ResponseEntity<>(SUCCESS, HttpStatus.CREATED);
    }

    @ApiOperation(value = "채팅방에서 읽은 마지막 메세지", notes = "해당 채팅방에서 읽은 마지막 메세지를 가져온다.")
    @GetMapping("/chat/readMessage/{roomId}")
    public ResponseEntity<ChatMessage> bringLstReadMessage(@RequestParam long memberId, @PathVariable int roomId){
        return new ResponseEntity<>(chatService.bringMessage(memberId, roomId), HttpStatus.OK);
    }

    @ApiOperation(value = "채팅방에서 안 읽은 메세지 개수", notes = "해당 채팅방에서 안 읽은 메세지의 개수를 가져온다.")
    @GetMapping("/chat/unreadMessage/{roomId}")
    public ResponseEntity<Integer> unreadMessageNumber(@RequestParam long memberId, @PathVariable int roomId){
        return new ResponseEntity<>(chatService.unreadMessageNumber(memberId, roomId), HttpStatus.OK);
    }

}
