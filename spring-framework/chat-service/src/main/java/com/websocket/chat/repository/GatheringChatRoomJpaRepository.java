package com.websocket.chat.repository;

import com.websocket.chat.dto.GatheringChatroom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GatheringChatRoomJpaRepository extends JpaRepository<GatheringChatroom, Integer> {

    GatheringChatroom save(GatheringChatroom gatheringChatroom);
    void deleteByGatheringChatroomId(int roomId);

}
