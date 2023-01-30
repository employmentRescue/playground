package com.ssafy.matching.service;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.dto.MemberGathering;

import java.util.List;
import java.util.Map;

public interface GatheringService {
    List<Gathering> findAll();
    List<Gathering> findGatheringsByMyLocation(float latX, float latY);
    List<Gathering> findGatheringsByFilter(Map<String, Object> map);

    Gathering getByGatheringId(int gatheringId);

    void registerGathering(Gathering gathering);
    void updateGathering(Gathering gathering);
    void deleteGathering(int gatheringId);

    void joinGathering(MemberGathering memberGathering);
    void leaveGathering(int gatheringId, int memberId);
}
