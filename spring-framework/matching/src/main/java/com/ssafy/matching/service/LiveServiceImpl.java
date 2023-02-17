package com.ssafy.matching.service;

import com.ssafy.matching.dto.Live;
import com.ssafy.matching.dto.LiveMember;
import com.ssafy.matching.repository.LiveMemberRepository;
import com.ssafy.matching.repository.LiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class LiveServiceImpl implements LiveService {
    @Autowired
    private LiveRepository liveRepository;

    @Autowired
    private LiveMemberRepository liveMemberRepository;

    @Override
    public List<Live> findLiveByLocation(float lat, float lng) {
        return liveRepository.findLiveByLocation(lat, lng);
    }

    @Override
    public Live getByLiveId(int liveId) {
        return liveRepository.getByLiveId(liveId);
    }

    @Override
    public void registerLive(Live live) {
        Live savedLive = liveRepository.save(live);
        liveMemberRepository.save(new LiveMember(0, savedLive.getLiveId(), savedLive.getHostId())); //호스트 멤버에 넣기
    }

    @Override
    public void updateLive(Live live) {
        liveRepository.save(live);
    }

    @Override
    public void deleteLive(int liveId) {
        liveMemberRepository.deleteByLiveId(liveId);
        liveRepository.deleteByLiveId(liveId);
    }

    @Override
    public void joinLive(LiveMember liveMember) {
        liveMemberRepository.save(liveMember);

        int liveId = liveMember.getLiveId();
        Live live = liveRepository.getByLiveId(liveId);

        live.setCurrentPeopleNum(live.getCurrentPeopleNum() + 1);
        liveRepository.save(live);
    }

    @Override
    public void leaveLive(int liveId, long memberId) {
        liveMemberRepository.deleteByLiveIdAndMemberId(liveId, memberId);

        Live live = liveRepository.getByLiveId(liveId);

        live.setCurrentPeopleNum(live.getCurrentPeopleNum() - 1);
        liveRepository.save(live);
    }
}
