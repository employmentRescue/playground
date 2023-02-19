package com.ssafy.matching.service;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.dto.GatheringMember;

import java.util.List;

public interface GatheringService {
    List<Gathering> findAll();
    List<Gathering> findGatheringsByFilter(String startDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String level, int minPlayTime, int maxPlayTime, String sex, String sports, String gameType, String sort);

    Gathering getByGatheringId(int gatheringId);

    void registerGathering(Gathering gathering);
    void updateGathering(Gathering gathering);
    void deleteGathering(int gatheringId);

    Gathering joinGathering(GatheringMember memberGathering);
    void leaveGathering(int gatheringId, long memberId);

    List<Gathering> searchGatheringsByKeyword(String keyword);
}
