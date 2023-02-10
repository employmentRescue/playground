package com.ssafy.matching.service;

import com.ssafy.matching.dto.Gathering;

import java.util.List;
import java.util.Map;

public interface MemberService {
    Map<String, Object> getWholeJoinListByMemberId(long memberId);
    List<Gathering> getTimeNotPastJoinListByMemberId(long memberId);
}
