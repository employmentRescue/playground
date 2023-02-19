package com.websocket.chat.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "고유번호", required = true)
    private int memberGatheringChatroomId;
    @ApiModelProperty(value = "운동모임 채팅방 아이디", required = true)
    private int gatheringChatroomId;
    @ApiModelProperty(value = "멤버 계정", required = true)
    private long memberId;

    public MemberGatheringChatroom(int memberGatheringChatroomId, int gatheringChatroomId, long memberId){
        this.memberGatheringChatroomId = memberGatheringChatroomId;
        this.gatheringChatroomId = gatheringChatroomId;
        this.memberId = memberId;
    }

    @ManyToOne
    @JoinColumn(name = "memberId", insertable=false, updatable = false)
    @JsonIgnore
    private MemberSometimes memberSometimes;

    @ManyToOne
    @JoinColumn(name = "gatheringChatroomId", insertable=false, updatable = false)
    @JsonIgnore
    private  GatheringChatroom gatheringChatroom;

}
