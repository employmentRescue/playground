package com.websocket.chat.repository;

import com.websocket.chat.dto.TeamChatroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamChatRoomJpaRepository extends JpaRepository<TeamChatroom, Integer> {

    TeamChatroom save(TeamChatroom teamChatroom);
    TeamChatroom findAllByTeamChatroomId(int roomId);
    List<TeamChatroom> findAll();


    


}
