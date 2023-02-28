package com.ssafy.teammatching.repository;

import com.ssafy.teammatching.dto.WaitingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface WaitingRoomRepository extends JpaRepository<WaitingRoom, Integer> {
    WaitingRoom findByTeamId(int teamId);
    WaitingRoom save(WaitingRoom waitingRoom);
    @Transactional
    void deleteByTeamId(int teamId);

    @Query(value = "SELECT * FROM waiting_room " +
            "WHERE match_date = ?1 " +
            "AND ST_Distance_Sphere(POINT(?3, ?2), POINT(lng, lat)) <= (distance + ?4) * 1000 " +
            "AND ((?5 between min_start_time AND max_start_time) OR (?6 between min_start_time AND max_start_time) OR (?5 < min_start_time AND max_start_time < ?6)) " +
            "AND sports = ?7 AND game_type = ?8 " +
            "AND ABS(team_point - ?9) <= 100 " +
            "AND team_id != ?10 " +
            "ORDER BY register_time ASC", nativeQuery = true)
    List<WaitingRoom> getWaitingRoomByFilter1(String matchDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String sports, String gameType, int point, int teamId);

    @Query(value = "SELECT * FROM waiting_room " +
            "WHERE match_date = ?1 " +
            "AND ST_Distance_Sphere(POINT(?3, ?2), POINT(lng, lat)) <= (distance + ?4) * 1000 " +
            "AND ((?5 between min_start_time AND max_start_time) OR (?6 between min_start_time AND max_start_time) OR (?5 < min_start_time AND max_start_time < ?6)) " +
            "AND sports = ?7 AND game_type = ?8 " +
            "AND ABS(team_point - ?9) <= 200 " +
            "AND team_id != ?10 " +
            "ORDER BY register_time ASC", nativeQuery = true)
    List<WaitingRoom> getWaitingRoomByFilter2(String matchDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String sports, String gameType, int point, int teamId);

    @Query(value = "SELECT * FROM waiting_room " +
            "WHERE match_date = ?1 " +
            "AND ST_Distance_Sphere(POINT(?3, ?2), POINT(lng, lat)) <= (distance + ?4) * 1000 " +
            "AND ((?5 between min_start_time AND max_start_time) OR (?6 between min_start_time AND max_start_time) OR (?5 < min_start_time AND max_start_time < ?6)) " +
            "AND sports = ?7 AND game_type = ?8 " +
            "AND ABS(team_point - ?9) <= 300 " +
            "AND team_id != ?10 " +
            "ORDER BY register_time ASC", nativeQuery = true)
    List<WaitingRoom> getWaitingRoomByFilter3(String matchDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String sports, String gameType, int point, int teamId);
}
