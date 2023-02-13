package com.ssafy.matching.repository;

import com.ssafy.matching.dto.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    Team getByTeamId(int teamId); //팀 상세보기
    Team save(Team team); //팀 등록, 수정
    void deleteByTeamId(int teamId); //팀 삭제

    long countAllBy();
    List<Team> getTop20BySportsAndGameTypeOrderByPointDesc(String sports, String gameType);

    @Query(value = "SELECT * " +
            "FROM team t, team_member m " +
            "WHERE t.team_id = m.team_id " +
            "AND m.member_id = ?1", nativeQuery = true)
    List<Team> getTeamsByMemberId(long memberId);

    @Query(value = "SELECT * FROM ( " +
            "SELECT * FROM team WHERE team_id = ?1 " +
            "UNION " +
            "SELECT * FROM (SELECT * FROM team WHERE point > (SELECT point FROM team WHERE team_id = ?1) " +
            "ORDER BY point ASC LIMIT 3 ) a " +
            "UNION " +
            "SELECT * FROM (SELECT * FROM team WHERE point < (SELECT point FROM team WHERE team_id = ?1) " +
            "ORDER BY point DESC LIMIT 3 ) b " +
            ") c ORDER BY point DESC", nativeQuery = true)
    List<Team> get7TeamsByTeamId(int teamId); //내 팀 앞뒤 상위3개 팀과 하위 3개 팀 검색

    List<Team> findAll();
}
