package com.websocket.chat.repository;

import com.websocket.chat.dto.GatheringChatroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GatheringChatRoomJpaRepository extends JpaRepository<GatheringChatroom, Integer> {

    GatheringChatroom save(GatheringChatroom gatheringChatroom);
    GatheringChatroom findAllByGatheringChatroomId(int roomId);
    List<GatheringChatroom> findAll();

}
