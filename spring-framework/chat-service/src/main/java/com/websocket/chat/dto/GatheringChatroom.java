package com.websocket.chat.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
public class GatheringChatroom implements Serializable {

    private static final long serialVersionUID = 6494678977089006649L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "운동모임 채팅방 아이디", required = true)
    private int gatheringChatroomId;
    @ApiModelProperty(value = "운동모임 아이디", required = true)
    private int gatheringId;
    @ApiModelProperty(value = "채팅방 이름", required = true)
    private String chatroomName;

    @OneToOne
    @JoinColumn(name = "gatheringId", insertable=false, updatable = false)
    private Gathering gathering;

    @OneToMany
    @JoinColumn(name = "gaatheringChatroomId")
    private List<MemberGatheringChatroom> memberGatheringChatrooms;

    @OneToMany
    @JoinColumn(name = "chatroomId")
    private List<ChatMessage> messages;


}
