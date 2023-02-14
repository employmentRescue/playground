package com.websocket.chat.dto;

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
    private int gatheringChatroomId;
    private int gatheringId;
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
