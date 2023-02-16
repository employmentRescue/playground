package com.ssafy.teammatching.repository;

import com.ssafy.teammatching.dto.MemberDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberDetailRepository extends JpaRepository<MemberDetail, Integer> {
    MemberDetail findByMemberId(long memberId);
}
