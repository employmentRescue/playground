package com.ssafy.matching.service;

import com.ssafy.matching.dto.Gathering;
import com.ssafy.matching.dto.Match;
import com.ssafy.matching.repository.GatheringRepository;
import com.ssafy.matching.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    GatheringRepository gatheringRepository;

    @Autowired
    MatchRepository matchRepository;

    @Override
    public Map<String, Object> getJoinListByMemberId(long memberId) {
        Map<String, Object> map = new HashMap<>();

        //운동모임 리스트(날짜 지남)
        List<Gathering> timePastGatheringList = gatheringRepository.getGatheringsTimePast(memberId);
        map.put("timePastGatheringList", timePastGatheringList);

        //운동모임 리스트(날짜 안지남)
        List<Gathering> timeNotPastGatheringList = gatheringRepository.getGatheringsTimeNotPast(memberId);
        map.put("timeNotPastGatheringList", timeNotPastGatheringList);

        //TODO ERROR : java.lang.StackOverflowError: null
        //팀 경기 리스트(날짜 지남)
        List<Match> timePastMatchList = matchRepository.getMatchesTimePast(memberId);
        map.put("timePastMatchList", timePastMatchList);

        //팀 경기 리스트(날짜 안지남)
        List<Match> timeNotPastMatchList = matchRepository.getMatchesTimeNotPast(memberId);
        map.put("timeNotPastMatchList", timeNotPastMatchList);

        return map;
    }
}
