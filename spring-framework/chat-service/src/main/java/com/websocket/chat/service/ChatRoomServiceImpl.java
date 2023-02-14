package com.websocket.chat.service;

import com.websocket.chat.dto.GatheringChatroom;
import com.websocket.chat.dto.TeamChatroom;
import com.websocket.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
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
    public TeamChatroom getTeamChatroomByRoomId(int roomId) {
        return chatRoomRepository.findTeamChatRoomByRoomId(roomId);
    }

    @Override
    public TeamChatroom createTeamChatroom(List<Long> memberIdList, TeamChatroom teamChatroom) {
        return chatRoomRepository.createTeamChatRoom(memberIdList, teamChatroom);
    }

    @Override
    public void exitTeamChatroom(long memberId, int roomId) {
        chatRoomRepository.exitTeamChatroom(memberId, roomId);
    }




    /*
        모임 채팅방
    */
    @Override
    public List<GatheringChatroom> getAllGatheringChatroomByMemberId(long memberId) {
        return chatRoomRepository.findAllGatheringChatRoomByMemberId(memberId);
    }

    @Override
    public GatheringChatroom getGatheringChatroomByRoomId(int roomId) {
        return chatRoomRepository.findGatheringChatRoomByRoomId(roomId);
    }

    @Override
    public GatheringChatroom createGatheringChatroom(List<Long> memberIdList, GatheringChatroom gatheringChatroom) {
        return chatRoomRepository.createGatheringChatRoom(memberIdList, gatheringChatroom);
    }

    @Override
    public void exitGatheringChatroom(long memberId, int roomId) {
        chatRoomRepository.exitGatheringChatroom(memberId, roomId);
    }


}
