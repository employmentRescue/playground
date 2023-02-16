package com.websocket.chat.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MemberTeamChatroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "고유번호", required = true)
    private int memberTeamChatroomId;
    @ApiModelProperty(value = "팀 채팅방 아이디", required = true)
    private int teamChatroomId;
    @ApiModelProperty(value = "멤버 계정", required = true)
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
