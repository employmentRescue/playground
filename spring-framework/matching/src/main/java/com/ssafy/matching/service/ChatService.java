package com.ssafy.matching.service;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.dto.Team;

public interface ChatService {
    void createTeamChatroom(Team team);
    void createGatheringChatroom(Gathering gathering);
}
