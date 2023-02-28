package com.ssafy.matching.service;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.dto.GatheringChatroom;
import com.ssafy.matching.dto.GatheringMember;
import com.ssafy.matching.repository.GatheringRepository;
import com.ssafy.matching.repository.GatheringMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class GatheringServiceImpl implements GatheringService {
    @Autowired
    private GatheringRepository gatheringRepository;
    @Autowired
    private GatheringMemberRepository gatheringMemberRepository;

    @Autowired
    ChattingServiceClient chattingServiceClient;

    @Override
    public List<Gathering> findAll() {
        System.out.println("findAll service 실행");
        return gatheringRepository.findAllByIsCompletedFalse();
    }

    @Override
    public List<Gathering> findGatheringsByFilter(String startDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String level, int minPlayTime, int maxPlayTime, String sex, String sports, String gameType, String sort) {
        if(sex.equals("성별무관")) sex = "";
        if(gameType.equals("종류무관")) gameType = "";

        switch (sort) {
            case "time" : return gatheringRepository.findGatheringsByFilterTimeASC(startDate, lat, lng, distance, minStartTime, maxStartTime, level, minPlayTime, maxPlayTime, sex, sports, gameType);
            case "people" : return gatheringRepository.findGatheringsByFilterRemainPeopleASC(startDate, lat, lng, distance, minStartTime, maxStartTime, level, minPlayTime, maxPlayTime, sex, sports, gameType);
            case "distance" : return gatheringRepository.findGatheringsByFilterDistanceASC(startDate, lat, lng, distance, minStartTime, maxStartTime, level, minPlayTime, maxPlayTime, sex, sports, gameType);
        }

        return gatheringRepository.findGatheringsByFilterRemainPeopleASC(startDate, lat, lng, distance, minStartTime, maxStartTime, level, minPlayTime, maxPlayTime, sex, sports, gameType);
    }

    @Override
    public Gathering getByGatheringId(int gatheringId) {
        System.out.println("getByGatheringId service 실행");
        return gatheringRepository.getByGatheringId(gatheringId);
    }

    @Override
    public void registerGathering(Gathering gathering) {
        Gathering savedGathering =  gatheringRepository.save(gathering);
        gatheringMemberRepository.save(new GatheringMember(0, savedGathering.getGatheringId(), savedGathering.getHostId())); //호스트 멤버에 넣기
    }

    @Override
    public void updateGathering(Gathering gathering) {
        gatheringRepository.save(gathering);
    }

    @Override
    public void deleteGathering(int gatheringId) {
        gatheringMemberRepository.deleteByGatheringId(gatheringId);
        gatheringRepository.deleteByGatheringId(gatheringId);
    }

    @Override
    public Gathering joinGathering(GatheringMember memberGathering) {
        gatheringMemberRepository.save(memberGathering);
        
        int gatheringId = memberGathering.getGatheringId();
        Gathering gathering = gatheringRepository.getByGatheringId(gatheringId);

        System.out.println("size : " + gathering.getMemberGatheringList().size());

        //운동 모임 모집이 완료되는 경우
        if(gathering.getMemberGatheringList().size() == gathering.getPeople()) {
            System.out.println("운동모임 모집 완료");
            gathering.setCompleted(true);
            gathering = gatheringRepository.save(gathering);
        }

        return gathering;
    }

    @Override
    public void leaveGathering(int gatheringId, long memberId) {
        //나가려는 멤버가 호스트이면, 호스트 다른 사람에게 넘겨주고 떠나기
        Gathering gathering = gatheringRepository.getByGatheringId(gatheringId);

        if(memberId == gathering.getHostId()) {
            long nextHostId = gathering.getMemberGatheringList().get(1).getMemberId();
            gathering.setHostId(nextHostId);
        }

        gatheringMemberRepository.deleteByGatheringIdAndMemberId(gatheringId, memberId);
    }

    @Override
    public List<Gathering> searchGatheringsByKeyword(String keyword) {
        return gatheringRepository.getGatheringsByTitleContaining(keyword);
    }
}
