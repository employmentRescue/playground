package com.ssafy.edu.api_gateway.Repository;

import com.ssafy.edu.api_gateway.dto.KakaoLoginAccessTokenCache;
import org.springframework.data.repository.CrudRepository;

public interface KakaoLoginAccessTokenCacheRepository extends CrudRepository<KakaoLoginAccessTokenCache, String> {
}
