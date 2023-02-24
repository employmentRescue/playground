package com.ssafy.oauth_service.Repository;

import com.ssafy.oauth_service.dto.KakaoLoginAccessTokenCache;
import com.ssafy.oauth_service.dto.KakaoLoginAccessTokenCacheForApp;
import org.springframework.data.repository.CrudRepository;

public interface KakaoLoginAccessTokenCacheForAppRepository extends CrudRepository<KakaoLoginAccessTokenCacheForApp, String> {
}
