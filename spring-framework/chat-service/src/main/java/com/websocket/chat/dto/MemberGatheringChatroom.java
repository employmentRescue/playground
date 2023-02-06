package com.websocket.chat.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class MemberGatheringChatroom {

    @Id
    private int memberGatheringChatroomId;
    private int gatheringChatroomId;
    private long memberId;

    @ManyToOne
    @JoinColumn(name = "memberId", insertable=false, updatable = false)
    private MemberSometimes memberSometimes;

}
