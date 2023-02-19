package com.websocket.chat.repository;

import com.websocket.chat.dto.*;
import com.websocket.chat.pubsub.RedisSubscriber;
import com.websocket.chat.service.ChatRoomService;
import com.websocket.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.swing.text.html.Option;
import java.util.*;

@RequiredArgsConstructor
@Repository
public class ChatRoomRepository {

    // 채팅방(topic)에 발행되는 메세지를 처리할 Listner
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;
    // Redis
    private static final String TEAM_CHAT_ROOMS = "TEAM_CHAT_ROOM";
    private static final String GATHERING_CHAT_ROOMS = "GATHERING_CHAT_ROOM";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, Integer, TeamChatroom> opsHashTeamChatRoom;
    private HashOperations<String, Integer, GatheringChatroom> opsHashGatheringChatRoom;
    /*
        채팅방의 대화 메세지를 발행하기 위한 redis topic 정보.
        서버별로 채팅방에 매치되는 topic 정보를 Map에 넣어
        roomId로 찾을 수 있도록 한다.
    */
    private Map<String, ChannelTopic> topics;

    private final ChatService chatService;
    private final TeamChatRoomJpaRepository teamChatRoomJpaRepository;
    private final GatheringChatRoomJpaRepository gatheringChatRoomJpaRepository;
    private final MemberTeamChatRoomJpaRepository memberTeamChatRoomJpaRepository;
    private final MemberGatheringChatroomJpaRepository memberGatheringChatRoomJpaRepository;




    @PostConstruct
    private void init() {
        opsHashTeamChatRoom = redisTemplate.opsForHash();
        opsHashGatheringChatRoom = redisTemplate.opsForHash();
        topics = new HashMap<>();
    }

    /*
        Team Chatroom
    */

    public TeamChatroom createTeamChatRoom(List<Long> memberIdList, TeamChatroom teamChatroom) {
        teamChatRoomJpaRepository.save(teamChatroom);
        List<TeamChatroom> list = teamChatRoomJpaRepository.findAll();
        TeamChatroom teamChatroomJpa = teamChatRoomJpaRepository.findAllByTeamChatroomId(list.get(list.size()-1).getTeamChatroomId());
        for(long memberId : memberIdList){
            MemberTeamChatroom memberTeamChatroom = new MemberTeamChatroom(0, teamChatroomJpa.getTeamChatroomId(), memberId);
            memberTeamChatRoomJpaRepository.save(memberTeamChatroom);
        }
        return teamChatroom;
    }

    public List<TeamChatroom> findAllTeamChatRoomByMemberId(long memberId) {
        List<MemberTeamChatroom> list = memberTeamChatRoomJpaRepository.findAllByMemberId(memberId);
        List<TeamChatroom> teamChatroomList = new ArrayList<>();
        for(MemberTeamChatroom mtc : list){
            int roomId = mtc.getTeamChatroomId();
            TeamChatroom teamChatroom = teamChatRoomJpaRepository.findAllByTeamChatroomId(roomId);

            String lastMessageContent = "";

            List<ChatMessage> chatMessageList = chatService.messageList(roomId);

            if(chatMessageList != null)
                lastMessageContent = chatMessageList.get(chatMessageList.size()-1).getContent();


            int unreadMessageNumber = chatService.unreadMessageNumber(memberId,roomId);

            teamChatroom.setLastMessageContent(lastMessageContent);
            teamChatroom.setUnreadMessageNumber(unreadMessageNumber);

            teamChatroomList.add(teamChatroom);
        }

        return teamChatroomList;
    }

    public TeamChatroom findTeamChatRoomByRoomId(int roomId) {
        return teamChatRoomJpaRepository.findAllByTeamChatroomId(roomId);
    }

    public void exitTeamChatroom(long memberId, int roomId){
        memberTeamChatRoomJpaRepository.deleteByMemberIdAndTeamChatroomId(memberId, roomId);
    }

    /*
        Gathering Chatroom
    */

    public GatheringChatroom createGatheringChatRoom(List<Long> memberIdList, GatheringChatroom gatheringChatroom) {
        gatheringChatRoomJpaRepository.save(gatheringChatroom);
        List<GatheringChatroom> list = gatheringChatRoomJpaRepository.findAll();
        GatheringChatroom gatheringChatroomJpa = gatheringChatRoomJpaRepository.findAllByGatheringChatroomId(list.get(list.size()-1).getGatheringChatroomId());
        for(long memberId : memberIdList){
            MemberGatheringChatroom memberGatheringChatroom = new MemberGatheringChatroom(0, gatheringChatroomJpa.getGatheringChatroomId(), memberId);
            memberGatheringChatRoomJpaRepository.save(memberGatheringChatroom);
        }
        return gatheringChatroom;
    }


    public List<GatheringChatroom> findAllGatheringChatRoomByMemberId(long memberId) {
        List<MemberGatheringChatroom> list = memberGatheringChatRoomJpaRepository.findAllByMemberId(memberId);
        List<GatheringChatroom> gatheringChatroomList = new ArrayList<>();
        for(MemberGatheringChatroom mgc : list){
            int roomId = mgc.getGatheringChatroomId();
            GatheringChatroom gatheringChatroom = gatheringChatRoomJpaRepository.findAllByGatheringChatroomId(roomId);

            String lastMessageContent = "";

            List<ChatMessage> chatMessageList = chatService.messageList(roomId);

            if(chatMessageList != null)
                lastMessageContent = chatMessageList.get(chatMessageList.size()-1).getContent();


            int unreadMessageNumber = chatService.unreadMessageNumber(memberId,roomId);

            gatheringChatroom.setLastMessageContent(lastMessageContent);
            gatheringChatroom.setUnreadMessageNumber(unreadMessageNumber);

            gatheringChatroomList.add(gatheringChatroom);
        }

        return gatheringChatroomList;
    }

    public GatheringChatroom findGatheringChatRoomByRoomId(int roomId) {
        return gatheringChatRoomJpaRepository.findAllByGatheringChatroomId(roomId);
    }

    public void exitGatheringChatroom(long memberId, int roomId){
        memberGatheringChatRoomJpaRepository.deleteByMemberIdAndGatheringChatroomId(memberId, roomId);
    }


    /*
        채팅방 입장: redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
    */
    // Chat Controller
    public void enterChatRoom(String roomId){
        ChannelTopic topic = topics.get(roomId);
        if(topic == null) {
            topic = new ChannelTopic(roomId);
            redisMessageListener.addMessageListener(redisSubscriber, topic);
            topics.put(roomId, topic);
        }
    }

    // Chat Controller
    public ChannelTopic getTopic(int roomId){
        String roomId1 = Integer.toString(roomId);
        return topics.get(roomId1);
    }


}
