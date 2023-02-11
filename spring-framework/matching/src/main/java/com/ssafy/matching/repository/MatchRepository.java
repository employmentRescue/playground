package com.ssafy.matching.repository;

import com.ssafy.matching.dto.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Integer> {
    Match getByMatchId(int matchId);

    @Query(value = "SELECT * " +
            "FROM `match` m, team_match_result r, team t " +
            "WHERE m.match_id = r.match_id AND r.team_id = t.team_id " +
            "AND t.name LIKE %?1%", nativeQuery = true)
    List<Match> getMatchByTeamName(String teamName);

    Match save(Match match);
    void deleteByMatchId(int matchId);

    //날짜 지난 팀 경기 리스트
    @Query(value = "SELECT * " +
            "FROM `match` m, team_match_result r, team t, team_member tm " +
            "WHERE m.match_id = r.match_id AND r.team_id = t.team_id AND t.team_id = tm.team_id " +
            "AND tm.member_id = ?1 " +
            "AND m.match_date < now() " +
            "ORDER BY m.match_date DESC", nativeQuery = true)
    List<Match> getMatchesTimePast(long memberId);

    @Query(value = "SELECT * " +
            "FROM `match` m, team_match_result r, team t, team_member tm " +
            "WHERE m.match_id = r.match_id AND r.team_id = t.team_id AND t.team_id = tm.team_id " +
            "AND tm.member_id = ?1 " +
            "AND m.match_date >= now() " +
            "ORDER BY m.match_date DESC", nativeQuery = true)
    List<Match> getMatchesTimeNotPast(long memberId);
}
