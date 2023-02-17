package com.websocket.chat.repository;

import com.websocket.chat.dto.MemberTeamChatroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberTeamChatRoomJpaRepository extends JpaRepository<MemberTeamChatroom, Integer> {
    List<MemberTeamChatroom> findAllByMemberId(long memberId);
    MemberTeamChatroom save(MemberTeamChatroom memberTeamChatroom);
    void deleteByMemberIdAndTeamChatroomId(long memberId, int roomId);
}
