package com.ssafy.matching.service;

import com.ssafy.matching.dto.Team;
import com.ssafy.matching.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class RankingServiceImpl implements RankingService {
    @Autowired
    TeamRepository teamRepository;

    @Override
    public List<Team> viewRanking(String sports, String gameType) {
        //TODO 티어 산정하기
        return teamRepository.getTop20BySportsAndGameTypeOrderByPointDesc(sports, gameType);
    }
}
