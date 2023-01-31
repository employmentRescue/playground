package com.ssafy.matching.service;

import com.ssafy.matching.dto.GatheringMember;
import com.ssafy.matching.dto.Live;
import com.ssafy.matching.dto.LiveMember;

import java.util.List;

public interface LiveService {
    List<Live> findLiveByLocation(float lat, float lng);

    Live getByLiveId(int liveId);

    void registerLive(Live live);
    void updateLive(Live live);
    void deleteLive(int liveId);

    void joinLive(LiveMember liveMember);
    void leaveLive(int liveId, int memberId);
}
