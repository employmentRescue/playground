package com.ssafy.oauth_service.Repository;

import com.ssafy.oauth_service.dto.KakaoLoginRefreshTokenCache;
import org.springframework.data.repository.CrudRepository;

public interface KakaoLoginRefreshTokenCacheRepository extends CrudRepository<KakaoLoginRefreshTokenCache, String> {
}
