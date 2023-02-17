package com.ssafy.matching.repository;

import com.ssafy.matching.dto.Member;
import com.ssafy.matching.dto.MemberDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberDetailRepository extends JpaRepository<MemberDetail, Long> {
    MemberDetail findByMemberId(long memberId);
    MemberDetail save(MemberDetail memberDetail);
}
