package com.ssafy.matching.service;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.dto.GatheringMember;

import java.util.List;
import java.util.Map;

public interface GatheringService {
    List<Gathering> findAll();
    List<Gathering> findGatheringsByFilter(Map<String, Object> map);

    Gathering getByGatheringId(int gatheringId);

    void registerGathering(Gathering gathering);
    void updateGathering(Gathering gathering);
    void deleteGathering(int gatheringId);

    void joinGathering(GatheringMember memberGathering);
    void leaveGathering(int gatheringId, long memberId);
}
