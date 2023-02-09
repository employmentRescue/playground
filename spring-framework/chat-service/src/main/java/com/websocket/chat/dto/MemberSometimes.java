package com.websocket.chat.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Getter
@Setter
public class MemberSometimes {

    @Id
    private long memberId;
    private String name;
    private String nickname;

    @OneToMany
    @JoinColumn(name="memberId")
    private List<MemberGatheringChatroom> memberGatheringChatrooms;

    @OneToMany
    @JoinColumn(name="memberId")
    private List<MemberTeamChatroom> memberTeamChatrooms;

}
