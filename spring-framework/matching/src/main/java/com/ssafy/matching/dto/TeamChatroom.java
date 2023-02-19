package com.ssafy.matching.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class TeamChatroom implements Serializable {
    private int teamChatroomId;
    private int teamId;
    private String chatroomName;

    @Builder
    public TeamChatroom(int teamId, String chatroomName) {
        this.teamId = teamId;
        this.chatroomName = chatroomName;
    }
}
