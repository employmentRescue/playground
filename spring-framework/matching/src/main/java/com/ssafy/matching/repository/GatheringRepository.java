package com.ssafy.matching.repository;

import com.ssafy.matching.dto.Gathering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GatheringRepository extends JpaRepository<Gathering, Integer> {
    List<Gathering> findAll(); //운동 모임 전체 리스트
    List<Gathering> findAllByIsCompletedFalse(); //운동 모임 전체 리스트(아직 모집완료 안된거)

    //필터 조건 + 시간순 정렬
    @Query(value = "SELECT * " +
            "FROM Gathering g, Place p " +
            "WHERE g.place_id = p.place_id " +
            "AND g.start_date = ?1 " +
            "AND ST_Distance_Sphere(POINT(?3, ?2), POINT(p.lng, p.lat)) <= ?4 " +
            "AND g.is_completed = false " +
            "AND (g.start_time BETWEEN ?5 AND ?6)" +
            "AND g.level = ?7 " +
            "AND (g.play_time BETWEEN ?8 AND ?9) " +
            "AND g.sex like %?10% AND g.sports = ?11 AND g.game_type LIKE %?12% " +
            "AND g.is_completed = 0 AND TIMESTAMP(g.start_date, g.start_time) >= now() " +
            "ORDER BY g.start_time ASC", nativeQuery = true)
    List<Gathering> findGatheringsByFilterTimeASC(String startDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String level, int minPlayTime, int maxPlayTime, String sex, String sports, String gameType);

    //필터 조건 + 남은 인원 수 정렬
    @Query(value = "SELECT * " +
            "FROM Gathering g, Place p " +
            "WHERE g.place_id = p.place_id " +
            "AND g.start_date = ?1 " +
            "AND ST_Distance_Sphere(POINT(?3, ?2), POINT(p.lng, p.lat)) <= ?4 " +
            "AND g.is_completed = false " +
            "AND (g.start_time BETWEEN ?5 AND ?6)" +
            "AND g.level = ?7 " +
            "AND (g.play_time BETWEEN ?8 AND ?9) " +
            "AND g.sex like %?10% AND g.sports = ?11 AND g.game_type LIKE %?12% " +
            "AND g.is_completed = 0 AND TIMESTAMP(g.start_date, g.start_time) >= now() " +
            "ORDER BY g.people - (SELECT COUNT(*) FROM Gathering g, Gathering_Member m " +
            "where g.gathering_id = m.gathering_id " +
            ") ASC", nativeQuery = true)
    List<Gathering> findGatheringsByFilterRemainPeopleASC(String startDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String level, int minPlayTime, int maxPlayTime, String sex, String sports, String gameType);

    //필터 조건 + 거리순 정렬
    @Query(value = "SELECT * " +
            "FROM Gathering g, Place p " +
            "WHERE g.place_id = p.place_id " +
            "AND g.start_date = ?1 " +
            "AND ST_Distance_Sphere(POINT(?3, ?2), POINT(p.lng, p.lat)) <= ?4 " +
            "AND g.is_completed = false " +
            "AND (g.start_time BETWEEN ?5 AND ?6)" +
            "AND g.level = ?7 " +
            "AND (g.play_time BETWEEN ?8 AND ?9) " +
            "AND g.sex like %?10% AND g.sports = ?11 AND g.game_type LIKE %?12% " +
            "AND g.is_completed = 0 AND TIMESTAMP(g.start_date, g.start_time) >= now() " +
            "ORDER BY ST_Distance_Sphere(POINT(?3, ?2), POINT(p.lng, p.lat)) ASC", nativeQuery = true)
    List<Gathering> findGatheringsByFilterDistanceASC(String startDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String level, int minPlayTime, int maxPlayTime, String sex, String sports, String gameType);

    Gathering getByGatheringId(int gatheringId); //해당 운동 모임 조회

    Gathering save(Gathering gathering); //insert, update 둘 다 사용(기존에 있는 데이터인지 판단해서 알아서 처리)
    void deleteByGatheringId(int gatheringId); //해당 운동 모임 삭제

    //날짜 지난 운동 모임 리스트
    @Query(value = "SELECT * " +
            "FROM gathering g, gathering_member m " +
            "where g.gathering_id = m.gathering_id " +
            "AND m.member_id = ?1 " +
            "AND TIMESTAMP(g.start_date, g.start_time) < now() " +
            "ORDER BY TIMESTAMP(g.start_date, g.start_time) DESC", nativeQuery = true)
    List<Gathering> getGatheringsTimePast(long memberId);

    //날짜 지나지 않은 운동 모임 리스트
    @Query(value = "SELECT * " +
            "FROM gathering g, gathering_member m " +
            "where g.gathering_id = m.gathering_id " +
            "AND m.member_id = ?1 " +
            "AND TIMESTAMP(g.start_date, g.start_time) >= now() " +
            "ORDER BY TIMESTAMP(g.start_date, g.start_time) DESC", nativeQuery = true)
    List<Gathering> getGatheringsTimeNotPast(long memberId);

    List<Gathering> getGatheringsByTitleLike(String keyword);
}
