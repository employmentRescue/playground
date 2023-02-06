package com.ssafy.oauth_service.Repository;

import com.ssafy.oauth_service.dto.KakaoLoginAccessTokenCache;
import org.springframework.data.repository.CrudRepository;

public interface KakaoLoginAccessTokenCacheRepository extends CrudRepository<KakaoLoginAccessTokenCache, String> {
}
