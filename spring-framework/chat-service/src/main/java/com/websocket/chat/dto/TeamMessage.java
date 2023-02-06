package com.websocket.chat.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class TeamMessage {

    @Id
    private int teamMessageId; // 메세지 아이디
    private int teamChatroomId; // 팀 채팅방 아이디
//    @Column(name="DATE_FIELD")
    private String regTime; // 등록날짜
    private long memberId; // 메시지 보낸사람'
    private String content; // 메시지
    private boolean isNotice; // 공지여부
    private String type; // 메시지 타입

    @OneToMany
    @JoinColumn(name = "messageId")
    private List<ReadTeamMessage> readTeamMessages;


}
