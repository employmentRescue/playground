package com.ssafy.oauth_service.Repository;


import com.ssafy.oauth_service.dto.KakaoTokensList;
import org.springframework.data.repository.CrudRepository;

public interface KakaoTokenListRepository extends CrudRepository<KakaoTokensList, Long> {
}
