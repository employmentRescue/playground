package com.ssafy.matching.repository;

import com.ssafy.matching.dto.Live;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LiveRepository extends JpaRepository<Live, Integer> {
    @Query(value = "SELECT * " +
            "FROM live l, place p " +
            "WHERE l.place_id = p.place_id " +
            "AND " +
            "ST_Distance_Sphere(POINT(?2, ?1), POINT(p.lng, p.lat)) <= 3000 ", nativeQuery = true)
    List<Live> findLiveByLocation(float lat, float lng); //내 위치 기준 반경 3km 안의 모든 운동 모임을 검색

    Live getByLiveId(int liveId); //해당 실시간 운동 모임 조회

    Live save(Live live); //insert, update 둘 다 사용(기존에 있는 데이터인지 판단해서 알아서 처리)
    void deleteByLiveId(int liveId); //해당 실시간 운동 모임 삭제
}
