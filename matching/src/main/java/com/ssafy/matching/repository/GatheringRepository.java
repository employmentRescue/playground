package com.ssafy.matching.repository;

import com.ssafy.matching.dto.Gathering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GatheringRepository extends JpaRepository<Gathering, Integer> {
    List<Gathering> findAll(); //운동 모임 전체 리스트
    List<Gathering> findAllByIsCompletedFalse(); //운동 모임 전체 리스트(아직 모집완료 안된거)

    //TODO 운동 모임 필터: 쿼리 구현
    @Query(value = "SELECT * " +
            "FROM Gathering g, Place p " +
            "WHERE g.place_id = p.place_id " +
            "AND " +
            "ST_Distance_Sphere(POINT(?2, ?3), POINT(p.latY, p.latX)) <= ?4 " +
            "AND g.is_completed = false " +
            "AND (g.start_time BETWEEN ?5 AND ?6)" +
            "AND g.level = ?7 " +
            "AND (g.play_time BETWEEN ?8 AND ?9) " +
            "AND g.sex = ?10 AND g.sports = ?11 AND g.gameType = ?12", nativeQuery = true)
    List<Gathering> findGatheringsByFilter(String startDate, float latX, float latY, int distance, int minStartTime, int maxStartTime, String level, int minPlayTime, int maxPlayTime, String sex, String sports, String gameType);

    Gathering getByGatheringId(int gatheringId); //해당 운동 모임 조회

    Gathering save(Gathering gathering); //insert, update 둘 다 사용(기존에 있는 데이터인지 판단해서 알아서 처리)
    void deleteByGatheringId(int gatheringId); //해당 운동 모임 삭제
}
