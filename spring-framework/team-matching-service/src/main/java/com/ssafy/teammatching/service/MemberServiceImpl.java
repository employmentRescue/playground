package com.ssafy.teammatching.service;

import com.ssafy.teammatching.dto.MemberDetail;
import com.ssafy.teammatching.repository.MemberDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService{
    @Autowired
    MemberDetailRepository memberDetailRepository;

    @Override
    public MemberDetail getMemberDetail(long memberId) {
        return memberDetailRepository.findByMemberId(memberId);
    }
}
