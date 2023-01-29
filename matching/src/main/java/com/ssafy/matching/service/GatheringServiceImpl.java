package com.ssafy.matching.service;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.dto.MemberGathering;
import com.ssafy.matching.repository.GatheringRepository;
import com.ssafy.matching.repository.MemberGatheringRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.stream.Location;
import java.util.List;

@Service
@Transactional
public class GatheringServiceImpl implements GatheringService {
    @Autowired
    private GatheringRepository gatheringRepository;
    @Autowired
    private MemberGatheringRepository memberGatheringRepository;

    @Override
    public List<Gathering> findAll() {
        return gatheringRepository.findAll();
    }

    @Override
    //내 위치 기준 반경 3km 안의 모든 운동 모임을 검색
    public List<Gathering> findGatheringsByMyLocation(float latX, float latY) {
        return gatheringRepository.findGatheringsByPlace(latX, latY);
    }

    @Override
    public Gathering getByGatheringId(int gatheringId) {
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
    public void joinGathering(MemberGathering memberGathering) {
        memberGatheringRepository.save(memberGathering);
    }

    @Override
    public void leaveGathering(int gatheringId, int memberId) {
        memberGatheringRepository.deleteByGatheringIdAndMemberId(gatheringId, memberId);
    }
}
