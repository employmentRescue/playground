package com.websocket.chat.service;

import com.websocket.chat.dto.GatheringChatroom;
import com.websocket.chat.dto.TeamChatroom;

import java.util.List;

public interface ChatRoomService {

    List<TeamChatroom> getAllTeamChatroomByMemberId(long memberId);
    TeamChatroom getTeamChatroomByRoomId(long memberId, int roomId);
    TeamChatroom createTeamChatroom(long memberId, TeamChatroom teamChatroom);
    void exitTeamChatroom(long memberId, int roomId);

    List<GatheringChatroom> getAllGatheringChatroomByMemberId(long memberId);
    GatheringChatroom getGatheringChatroomByRoomId(long memberId, int roomId);
    GatheringChatroom createGatheringChatroom(long memberId, GatheringChatroom gatheringChatroom);
    void exitGatheringChatroom(long memberId, int roomId);


}
