package com.websocket.chat.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.lang.reflect.Member;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MemberGatheringChatroom {

    @Id
    private int memberGatheringChatroomId;
    private int gatheringChatroomId;
    private long memberId;

    public MemberGatheringChatroom(int memberGatheringChatroomId, int gatheringChatroomId, long memberId){
        this.memberGatheringChatroomId = memberGatheringChatroomId;
        this.gatheringChatroomId = gatheringChatroomId;
        this.memberId = memberId;
    }

    @ManyToOne
    @JoinColumn(name = "memberId", insertable=false, updatable = false)
    private MemberSometimes memberSometimes;

}
