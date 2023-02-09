package com.ssafy.matching.repository;

import com.ssafy.matching.dto.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    Team getByTeamId(int teamId); //팀 상세보기
    Team save(Team team); //팀 등록, 수정
    void deleteByTeamId(int teamId); //팀 삭제

    long countAllBy();
    List<Team> getTop20BySportsAndGameTypeOrderByPointDesc(String sports, String gameType);
}
