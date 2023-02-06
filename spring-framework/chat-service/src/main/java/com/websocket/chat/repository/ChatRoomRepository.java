package com.websocket.chat.repository;

import com.websocket.chat.dto.GatheringChatroom;
import com.websocket.chat.dto.MemberTeamChatroom;
import com.websocket.chat.dto.Team;
import com.websocket.chat.dto.TeamChatroom;
import com.websocket.chat.pubsub.RedisSubscriber;
import com.websocket.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
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

    private final TeamChatRoomJpaRepository teamChatRoomJpaRepository;
    private final GatheringChatRoomJpaRepository gatheringChatRoomJpaRepository;
    private final MemberTeamChatRoomJpaRepository memberTeamChatRoomJpaRepository;
    private final MemberGatheringChatroomJpaRepository memberGatheringChatroomJpaRepository;


    //Todo 컨트롤러는 다 만들었음. 서비스 인터페이스 다 만들었음. + JPA 레포지토리 만들었음. 서비스 구현체 + 래포지토리
    //Todo 이젠 JPA 로 객체를 반환받고 해당 객체를 Redis 에 넣어서 캐싱으로 사용해야 하는 단계에 왔음.
    // MySQL 과 Redis 의 연동을 해야할 때임.

    @PostConstruct
    private void init() {
        opsHashTeamChatRoom = redisTemplate.opsForHash();
        opsHashGatheringChatRoom = redisTemplate.opsForHash();
        topics = new HashMap<>();
    }

    /*
        Team Chatroom
    */
    public List<TeamChatroom> findAllTeamChatRoomByMemberId(long memberId) {
        String memberId1 = String.valueOf(memberId);
        return opsHashTeamChatRoom.values(memberId1);
    }

    public TeamChatroom findTeamChatRoomByRoomId(long memberId, int roomId) {
        String memberId1 = String.valueOf(memberId);
        return teamChatRoomJpaRepository.findAllByTeamChatroomId(roomId);
//        return opsHashTeamChatRoom.get(memberId1, roomId);
    }

    public void exitTeamChatroom(long memberId, int roomId){
        String memberId1 = String.valueOf(memberId);
        opsHashTeamChatRoom.delete(memberId1, roomId);
    }

    /*
        Gathering Chatroom
    */
    public List<GatheringChatroom> findAllGatheringChatRoomByMemberId(long memberId) {
        String memberId1 = String.valueOf(memberId);
        return opsHashGatheringChatRoom.values(memberId1);
    }

    public GatheringChatroom findGatheringChatRoomByRoomId(long memberId, int roomId) {
        String memberId1 = String.valueOf(memberId);
        return opsHashGatheringChatRoom.get(memberId1, roomId);
    }

    public void exitGatheringChatroom(long memberId, int roomId){
        String memberId1 = String.valueOf(memberId);
        opsHashGatheringChatRoom.delete(memberId1, roomId);
    }
    /*
        채팅방 생성: 서버간 채팅방 공유를 위해 redis hash에 저장.
    */
    public TeamChatroom createTeamChatRoom(long memberId, TeamChatroom teamChatroom) {
        String memberId1 = String.valueOf(memberId);
        List<TeamChatroom> list = opsHashTeamChatRoom.values(memberId1);
        teamChatroom.setTeamChatroomId(list.size());
        teamChatRoomJpaRepository.save(teamChatroom);
        opsHashTeamChatRoom.put(memberId1, teamChatroom.getTeamChatroomId(), teamChatroom);
        return teamChatroom;
    }

    public GatheringChatroom createGatheringChatRoom(long memberId, GatheringChatroom gatheringChatroom) {
        String memberId1 = String.valueOf(memberId);
        opsHashGatheringChatRoom.put(memberId1, gatheringChatroom.getGatheringChatroomId(), gatheringChatroom);
        gatheringChatRoomJpaRepository.save(gatheringChatroom);
        return gatheringChatroom;
    }

    /*
        채팅방 입장: redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
    */
    // Chat Controller
    public void enterChatRoom(int roomId){
        String roomId1 = Integer.toString(roomId);
        ChannelTopic topic = topics.get(roomId1);
        if(topic == null) {
            topic = new ChannelTopic(roomId1);
            redisMessageListener.addMessageListener(redisSubscriber, topic);
            topics.put(roomId1, topic);
        }
    }

    // Chat Controller
    public ChannelTopic getTopic(int roomId){
        return topics.get(roomId);
    }


}
