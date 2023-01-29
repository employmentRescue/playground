package com.ssafy.matching.repository;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.dto.MemberGathering;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberGatheringRepository extends JpaRepository<MemberGathering, Integer> {
    MemberGathering save(MemberGathering memberGathering);
    void deleteByGatheringIdAndMemberId(int gatheringId, int memberId);
}
