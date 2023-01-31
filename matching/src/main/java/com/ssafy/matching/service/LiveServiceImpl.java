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
        liveRepository.save(live);
    }

    @Override
    public void updateLive(Live live) {
        liveRepository.save(live);
    }

    @Override
    public void deleteLive(int liveId) {
        liveRepository.deleteByLiveId(liveId);
    }

    @Override
    public void joinLive(LiveMember liveMember) {
        liveMemberRepository.save(liveMember);
    }

    @Override
    public void leaveLive(int liveId, int memberId) {
        liveMemberRepository.deleteByLiveIdAndMemberId(liveId, memberId);
    }
}
