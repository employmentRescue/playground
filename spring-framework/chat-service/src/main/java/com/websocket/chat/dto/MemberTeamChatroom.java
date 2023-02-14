package com.websocket.chat.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MemberTeamChatroom {

    @Id
    private int memberTeamChatroomId;
    private int teamChatroomId;
    private long memberId;

    @ManyToOne
    @JoinColumn(name = "memberId", insertable=false, updatable = false)
    @JsonIgnore
    private MemberSometimes memberSometimes;

    @ManyToOne
    @JoinColumn(name = "teamChatroomId", insertable=false, updatable = false)
    @JsonIgnore
    private  TeamChatroom teamChatroom;

    public MemberTeamChatroom(int memberTeamChatroomId, int teamChatroomId, long memberId) {
        this.memberTeamChatroomId = memberTeamChatroomId;
        this.teamChatroomId = teamChatroomId;
        this.memberId = memberId;
    }
}
