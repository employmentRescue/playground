package com.ssafy.matching.repository;

import com.ssafy.matching.dto.GatheringMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GatheringMemberRepository extends JpaRepository<GatheringMember, Integer> {
    GatheringMember save(GatheringMember memberGathering);
    void deleteByGatheringIdAndMemberId(int gatheringId, int memberId);
}
