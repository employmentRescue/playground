package com.ssafy.matching.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class GatheringChatroom implements Serializable {
    private int gatheringChatroomId;
    private int gatheringId;
    private String chatroomName;

    @Builder
    public GatheringChatroom(int gatheringId, String chatroomName) {
        this.gatheringId = gatheringId;
        this.chatroomName = chatroomName;
    }
}
