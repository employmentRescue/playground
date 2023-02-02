package com.ssafy.matching.repository;

import com.ssafy.matching.dto.LiveMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LiveMemberRepository extends JpaRepository<LiveMember, Integer> {
    LiveMember save(LiveMember liveMember);
    void deleteByLiveIdAndMemberId(int liveId, long memberId);
    void deleteByLiveId(int liveId);
}
