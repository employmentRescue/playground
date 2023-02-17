package com.websocket.chat.repository;

import com.websocket.chat.dto.MemberGatheringChatroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberGatheringChatroomJpaRepository extends JpaRepository<MemberGatheringChatroom, Integer> {
    List<MemberGatheringChatroom> findAllByMemberId(long memberId);
    MemberGatheringChatroom save(MemberGatheringChatroom memberGatheringChatroom);
    void deleteByMemberIdAndGatheringChatroomId(long memberId, int roomId);
}
