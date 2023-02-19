package com.websocket.chat.dto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class TeamChatroom implements Serializable {

//    private static final long serialVersionUID = 6494678977089006639L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "팀 채팅방 아이디", required = true)
    private int teamChatroomId;
    @ApiModelProperty(value = "팀 아이디", required = true)
    private int teamId;
    @ApiModelProperty(value = "팀채팅방 이름", required = true)
    private String chatroomName;
    @Transient
    @ApiModelProperty(value = "채팅방의 마지막 메세지")
    private String lastMessageContent;
    @Transient
    @ApiModelProperty(value = "채팅방의 안 읽은 메세지 개수")
    private int unreadMessageNumber;

    @OneToOne
    @JoinColumn(name = "teamId", insertable=false, updatable = false)
    private Team team;

    @OneToMany
    @JoinColumn(name = "teamChatroomId")
    private List<MemberTeamChatroom> memberTeamChatrooms;

    @OneToMany
    @JoinColumn(name = "chatroomId")
    private List<ChatMessage> messages;
}
