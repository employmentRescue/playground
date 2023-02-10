package com.ssafy.matching.service;

import java.util.Map;

public interface UserService {
    Map<String, Object> getJoinListByMemberId(long memberId);
}
