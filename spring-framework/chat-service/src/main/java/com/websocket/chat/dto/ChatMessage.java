package com.websocket.chat.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
public class ChatMessage implements Serializable {

    @Id
//    private int messageId; // 메세지 아이디
    private int chatroomId; // 팀 채팅방 아이디
//    @Column(name="DATE_FIELD")
    private String regTime; // 등록날짜
    private long memberId; // 메시지 보낸사람'
    private String content; // 메시지
    private boolean isNotice; // 공지여부
    private String type; // 메시지 타입



}
