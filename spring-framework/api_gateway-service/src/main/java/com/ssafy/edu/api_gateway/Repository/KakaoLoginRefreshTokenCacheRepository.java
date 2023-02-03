package com.ssafy.edu.api_gateway.Repository;

import com.ssafy.edu.api_gateway.dto.KakaoLoginRefreshTokenCache;
import org.springframework.data.repository.CrudRepository;

public interface KakaoLoginRefreshTokenCacheRepository extends CrudRepository<KakaoLoginRefreshTokenCache, String> {
}
