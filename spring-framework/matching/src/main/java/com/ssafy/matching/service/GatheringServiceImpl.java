package com.ssafy.matching.service;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.dto.GatheringMember;
import com.ssafy.matching.repository.GatheringRepository;
import com.ssafy.matching.repository.GatheringMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class GatheringServiceImpl implements GatheringService {
    @Autowired
    private GatheringRepository gatheringRepository;
    @Autowired
    private GatheringMemberRepository gatheringMemberRepository;

    @Override
    public List<Gathering> findAll() {
        System.out.println("findAll service 실행");
        return gatheringRepository.findAllByIsCompletedFalse();
    }

    @Override
    public List<Gathering> findGatheringsByFilter(Map<String, Object> map) {
        //필터 조건 : 날짜, 지역(lat, lng), 반경, 최소 시작시간, 최대 시작시간, 수준, 최소 게임시간, 최대 게임시간, 성별, 운동종류, 게임종류, 정렬
        String startDate = (String)map.get("startDate");
        double lat =  (double)map.get("lat");
        double lng =  (double)map.get("lng");
        int distance = (int)map.get("distance");
        String minStartTime = (String) map.get("minStartTime");
        String maxStartTime = (String) map.get("maxStartTime");
        String level = (String)map.get("level");
        int minPlayTime = (int) map.get("minPlayTime");
        int maxPlayTime = (int) map.get("maxPlayTime");
        String sex = (String)map.get("sex");
        String sports = (String)map.get("sports");
        String gameType = (String)map.get("gameType");
        String sort = (String)map.get("sort");
        
        if(sex.equals("성별무관")) sex = "";
        if(gameType.equals("종류무관")) gameType = "";
        
        switch (sort) {
            case "time" : return gatheringRepository.findGatheringsByFilterTimeASC(startDate, lat, lng, distance, minStartTime, maxStartTime, level, minPlayTime, maxPlayTime, sex, sports, gameType);
            case "people" : return gatheringRepository.findGatheringsByFilterDistanceASC(startDate, lat, lng, distance, minStartTime, maxStartTime, level, minPlayTime, maxPlayTime, sex, sports, gameType);
            case "distance" : return gatheringRepository.findGatheringsByFilterRemainPeopleASC(startDate, lat, lng, distance, minStartTime, maxStartTime, level, minPlayTime, maxPlayTime, sex, sports, gameType);
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
    public void joinGathering(GatheringMember memberGathering) {
        gatheringMemberRepository.save(memberGathering);
        
        //TODO 의문점
        int gatheringId = memberGathering.getGatheringId();
        Gathering gathering = gatheringRepository.getByGatheringId(gatheringId);

        System.out.println("size : " + gathering.getMemberGatheringList().size()); //왜 이 시점에서는 앞에 결과가 반영이 안될까...?

        if(gathering.getMemberGatheringList().size() + 1 == gathering.getPeople()) { //위에 문제 때문에 +1 해줌..
            gathering.setCompleted(true);
            System.out.println("gathering : " + gathering);
            gatheringRepository.save(gathering);
        }
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
}
