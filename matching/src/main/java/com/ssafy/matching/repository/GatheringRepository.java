package com.ssafy.matching.repository;

import com.ssafy.matching.dto.Gathering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GatheringRepository extends JpaRepository<Gathering, Integer> {
    List<Gathering> findAll(); //운동 모임 전체 리스트

    //Error : Encountered a duplicated sql alias [place_id] during auto-discovery of a native-sql query
    @Query(value = "SELECT * " +
            "FROM Gathering g, Place p " +
            "WHERE g.place_id = p.place_id " +
            "AND " +
            "ST_Distance_Sphere(POINT(?1, ?2), POINT(p.latY, p.latX)) <= 3000", nativeQuery = true)
    List<Gathering> findGatheringsByPlace(float latX, float latY); //내 위치 기준 반경 3km 안의 모든 운동 모임을 검색

    Gathering getByGatheringId(int gatheringId); //해당 운동 모임 조회

    Gathering save(Gathering gathering); //insert, update 둘 다 사용(기존에 있는 데이터인지 판단해서 알아서 처리)

    void deleteByGatheringId(int gatheringId); //해당 운동 모임 삭제
}
