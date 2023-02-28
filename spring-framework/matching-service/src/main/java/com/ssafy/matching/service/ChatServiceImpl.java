package com.ssafy.matching.service;

import com.ssafy.matching.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ChatServiceImpl implements ChatService{
    @Autowired
    ChattingServiceClient chattingServiceClient;

    @Override
    public void createTeamChatroom(Team team) {
        TeamChatroom teamChatroom = TeamChatroom.builder()
                .teamId(team.getTeamId())
                .chatroomName(team.getName())
                .build();

        List<Long> memberIdList = new ArrayList<>();
        for(TeamMember teamMember : team.getTeamMemberList()) {
            memberIdList.add(teamMember.getMemberId());
        }

        Map<String, Object> map = new HashMap<>();
        map.put("teamChatroom", teamChatroom);
        map.put("memberIdList", memberIdList);

        chattingServiceClient.createTeamChatRoom(map);
    }

    @Override
    public void createGatheringChatroom(Gathering gathering) {
        GatheringChatroom gatheringChatroom = GatheringChatroom.builder()
                .gatheringId(gathering.getGatheringId())
                .chatroomName(gathering.getStartDate() + " " + gathering.getSports())
                .build();

        List<Long> memberIdList = new ArrayList<>();

        for(GatheringMember gatheringMember : gathering.getMemberGatheringList()) {
            memberIdList.add(gatheringMember.getMemberId());
        }

        Map<String, Object> map = new HashMap<>();
        map.put("gatheringChatroom", gatheringChatroom);
        map.put("memberIdList", memberIdList);

        chattingServiceClient.createGatheringChatRoom(map);
    }
}
