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
    private GatheringMemberRepository memberGatheringRepository;

    @Override
    public List<Gathering> findAll() {
        System.out.println("findAll service 실행");
        return gatheringRepository.findAllByIsCompletedFalse();
    }

    @Override
    public List<Gathering> findGatheringsByFilter(Map<String, Object> map) {
        //필터 조건 : 날짜, 지역(latX, latY), 반경, 최소 시작시간, 최대 시작시간, 수준, 최소 게임시간, 최대 게임시간, 성별, 게임종류
        String startDate = (String)map.get("startDate");
        float latX =  (float)map.get("latX");
        float latY =  (float)map.get("latX");
        int distance = (int)map.get("distance");
        int minStartTime = (int)map.get("minStartTime");
        int maxStartTime = (int)map.get("maxStartTime");
        String level = (String)map.get("level");
        int minPlayTime = (int)map.get("minPlayTime");
        int maxPlayTime = (int)map.get("maxPlayTime");
        String sex = (String)map.get("sex");
        String sports = (String)map.get("sports");
        String gameType = (String)map.get("gameType");
        
        //TODO sort 구현해야 함
        return gatheringRepository.findGatheringsByFilter(startDate, latX, latY, distance, minStartTime, maxStartTime, level, minPlayTime, maxPlayTime, sex, sports, gameType);
    }

    @Override
    public Gathering getByGatheringId(int gatheringId) {
        System.out.println("getByGatheringId service 실행");
        return gatheringRepository.getByGatheringId(gatheringId);
    }

    @Override
    public void registerGathering(Gathering gathering) {
        gatheringRepository.save(gathering);
    }

    @Override
    public void updateGathering(Gathering gathering) {
        gatheringRepository.save(gathering);
    }

    @Override
    public void deleteGathering(int gatheringId) {
        gatheringRepository.deleteByGatheringId(gatheringId);
    }

    @Override
    public void joinGathering(GatheringMember memberGathering) {
        memberGatheringRepository.save(memberGathering);
        
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
        memberGatheringRepository.deleteByGatheringIdAndMemberId(gatheringId, memberId);
    }
}
