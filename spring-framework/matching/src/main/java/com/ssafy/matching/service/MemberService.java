package com.ssafy.matching.service;

import java.util.Map;

public interface MemberService {
    Map<String, Object> getWholeJoinListByMemberId(long memberId);
    Map<String, Object> getTimeNotPastJoinListByMemberId(long memberId);
}
