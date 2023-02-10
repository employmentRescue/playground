package com.websocket.chat.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
public class MemberTeamChatroom {

    @Id
    private int memberTeamChatroomId;
    private int teamChatroomId;
    private long memberId;

    @ManyToOne
    @JoinColumn(name = "memberId", insertable=false, updatable = false)
    private MemberSometimes memberSometimes;

    @ManyToOne
    @JoinColumn(name = "teamChatroomId", insertable=false, updatable = false)
    private  TeamChatroom teamChatroom;

}
