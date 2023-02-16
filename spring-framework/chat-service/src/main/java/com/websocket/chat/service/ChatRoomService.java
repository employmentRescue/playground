package com.websocket.chat.service;

import com.websocket.chat.dto.GatheringChatroom;
import com.websocket.chat.dto.TeamChatroom;

import java.util.List;

public interface ChatRoomService {

    List<TeamChatroom> getAllTeamChatroomByMemberId(long memberId);
    TeamChatroom getTeamChatroomByRoomId(int roomId);
    TeamChatroom createTeamChatroom(List<Long> memberIdList, TeamChatroom teamChatroom);
//    TeamChatroom createTeamChatroom2(TeamChatroom teamChatroom);
    void exitTeamChatroom(long memberId, int roomId);

    List<GatheringChatroom> getAllGatheringChatroomByMemberId(long memberId);
    GatheringChatroom getGatheringChatroomByRoomId(int roomId);
    GatheringChatroom createGatheringChatroom(List<Long> memberIdList, GatheringChatroom gatheringChatroom);
    void exitGatheringChatroom(long memberId, int roomId);


}
