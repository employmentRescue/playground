package com.websocket.chat.service;

import com.websocket.chat.dto.Gathering;
import com.websocket.chat.dto.GatheringChatroom;
import com.websocket.chat.dto.TeamChatroom;
import com.websocket.chat.repository.ChatRoomRepository;
import com.websocket.chat.repository.GatheringChatRoomJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;


    /*
        팀 채팅방
    */
    @Override
    public List<TeamChatroom> getAllTeamChatroomByMemberId(long memberId) {
        return chatRoomRepository.findAllTeamChatRoomByMemberId(memberId);
    }

    @Override
    public TeamChatroom getTeamChatroomByRoomId(long memberId, int roomId) {
        return chatRoomRepository.findTeamChatRoomByRoomId(memberId, roomId);
    }

    @Override
    public TeamChatroom createTeamChatroom(long memberId, TeamChatroom teamChatroom) {
        return chatRoomRepository.createTeamChatRoom(memberId, teamChatroom);
    }

    @Override
    public void exitTeamChatroom(long memberId, int roomId) {

    }




    /*
        모임 채팅방
    */
    @Override
    public List<GatheringChatroom> getAllGatheringChatroomByMemberId(long memberId) {
        return chatRoomRepository.findAllGatheringChatRoomByMemberId(memberId);
    }

    @Override
    public GatheringChatroom getGatheringChatroomByRoomId(long memberId, int roomId) {
        return chatRoomRepository.findGatheringChatRoomByRoomId(memberId, roomId);
    }

    @Override
    public GatheringChatroom createGatheringChatroom(long memberId, GatheringChatroom gatheringChatroom) {
        return chatRoomRepository.createGatheringChatRoom(memberId, gatheringChatroom);
    }

    @Override
    public void exitGatheringChatroom(long memberId, int roomId) {

    }


}
