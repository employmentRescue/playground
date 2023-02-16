package com.websocket.chat.dto;

import io.swagger.annotations.ApiModelProperty;
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
    private int messageId; // 메세지 아이디
    @ApiModelProperty(value = "채팅방 아이디", required = true)
    private int chatroomId; // 팀 채팅방 아이디
//    @Column(name="DATE_FIELD")
    @ApiModelProperty(value = "메세지 등록날짜", required = true)
    private String regTime; // 등록날짜
    @ApiModelProperty(value = "메세지 보낸사람", required = true)
    private long memberId; // 메시지 보낸사람'
    @ApiModelProperty(value = "메세지 내용", required = true)
    private String content; // 메시지
    @ApiModelProperty(value = "메세지 공지여부", required = true)
    private boolean isNotice; // 공지여부
    @ApiModelProperty(value = "메세지 타입", required = true)
    private String type; // 메시지 타입



}
