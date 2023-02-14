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

    //TODO 팀 경기 거리순 정렬 쿼리 작성하기
    //필터 조건 + 거리순 정렬
    @Query(value = "SELECT * FROM `match` m, team t, preferred_place p " +
            "WHERE m.host_id = t.team_id AND m.place_id = p.preferred_place_id " +
            "AND m.match_date = ?1 " +
            "AND ST_Distance_Sphere(POINT(?3, ?2), POINT(p.lng, p.lat)) <= (m.distance + ?4) " +
            "AND ?5 between m.min_start_time AND m.max_start_time " +
            "AND m.match_sports = ?6 AND m.match_game_type = ?7 " +
            "AND m.match_date >= now() " +
            "ORDER BY ST_Distance_Sphere(POINT(?3, ?2), POINT(p.lng, p.lat)) ASC", nativeQuery = true)
    List<Match> findMatchesByFilterDistanceASC(String matchDate, double lat, double lng, int distance, String minStartTime, String sports, String gameType);

    //TODO 팀 경기 티어 낮은순 정렬 쿼리 작성하기
    //필터 조건 + 티어 낮은순 정렬
    @Query(value = "SELECT * " +
            "FROM `match` m, team t, preferred_place p " +
            "WHERE m.host_id = t.team_id AND m.place_id = p.preferred_place_id " +
            "AND m.match_date = ?1 " +
            "AND ST_Distance_Sphere(POINT(?3, ?2), POINT(p.lng, p.lat)) <= (m.distance + ?4) " +
            "AND ?5 between m.min_start_time AND m.max_start_time " +
            "AND m.match_sports = ?6 AND m.match_game_type = ?7 " +
            "AND m.match_date >= now() " +
            "ORDER BY t.point ASC", nativeQuery = true)
    List<Match> findMatchesByFilterPointASC(String matchDate, double lat, double lng, int distance, String minStartTime, String sports, String gameType);

    //TODO 팀 경기 티어 낮은순 정렬 쿼리 작성하기
    //필터 조건 + 티어 높은순 정렬
    @Query(value = "SELECT * " +
            "FROM `match` m, team t, preferred_place p " +
            "WHERE m.host_id = t.team_id AND m.place_id = p.preferred_place_id " +
            "AND m.match_date = ?1 " +
            "AND ST_Distance_Sphere(POINT(?3, ?2), POINT(p.lng, p.lat)) <= (m.distance + ?4) " +
            "AND ?5 between m.min_start_time AND m.max_start_time " +
            "AND m.match_sports = ?6 AND m.match_game_type = ?7 " +
            "AND m.match_date >= now() " +
            "ORDER BY t.point DESC", nativeQuery = true)
    List<Match> findMatchesByFilterPointDESC(String matchDate, double lat, double lng, int distance, String minStartTime, String sports, String gameType);
}
