package com.ssafy.matching.service;

import com.ssafy.matching.dto.*;
import com.ssafy.matching.repository.GatheringRepository;
import com.ssafy.matching.repository.MatchRepository;
import com.ssafy.matching.repository.MemberDetailRepository;
import com.ssafy.matching.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {
    @Autowired
    GatheringRepository gatheringRepository;

    @Autowired
    MatchRepository matchRepository;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    MemberDetailRepository memberDetailRepository;

    @Override
    public Map<String, Object> getWholeJoinListByMemberId(long memberId) {
        Map<String, Object> map = new HashMap<>();

        //운동모임 리스트(날짜 지남)
        List<Gathering> timePastGatheringList = gatheringRepository.getGatheringsTimePast(memberId);
        map.put("timePastGatheringList", timePastGatheringList);

        //운동모임 리스트(날짜 안지남)
        List<Gathering> timeNotPastGatheringList = gatheringRepository.getGatheringsTimeNotPast(memberId);
        map.put("timeNotPastGatheringList", timeNotPastGatheringList);

        //팀 경기 리스트(날짜 지남)
        List<Match> timePastMatchList = matchRepository.getMatchesTimePast(memberId);
        map.put("timePastMatchList", timePastMatchList);

        //팀 경기 리스트의 상대 리스트(날짜 지남)
        List<String> timePastMatchOpTeamList = new ArrayList<>();
        for(Match match : timePastMatchList) {
            List<TeamMatchResult> teamMatchResultList = match.getTeamMatchResultList();

            for(TeamMatchResult teamMatchResult : teamMatchResultList) {
                int teamId = teamMatchResult.getTeamId();
                
                //TODO 우리팀이 아니면 상대팀임
                Team team = teamRepository.getByTeamId(teamId);
                String teamName = team.getName();

                timePastMatchOpTeamList.add(teamName);
            }
        }

        //팀 경기 리스트(날짜 안지남)
        List<Match> timeNotPastMatchList = matchRepository.getMatchesTimeNotPast(memberId);
        map.put("timeNotPastMatchList", timeNotPastMatchList);

        return map;
    }

    @Override
    public List<Gathering> getTimeNotPastJoinListByMemberId(long memberId) {
        //운동모임 리스트(날짜 안지남)
        return gatheringRepository.getGatheringsTimeNotPast(memberId);
    }

    @Override
    public MemberDetail updateMemberDetail(long memberId, String token) {
        MemberDetail memberDetail = memberDetailRepository.findByMemberId(memberId);
        memberDetail.setWebFcmToken(token);

        return memberDetailRepository.save(memberDetail);
    }
}
