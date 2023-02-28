package com.ssafy.oauth_service.Repository;

import com.ssafy.oauth_service.dto.KakaoTokensList;
import com.ssafy.oauth_service.dto.RegisterCodeCache;
import org.springframework.data.repository.CrudRepository;

public interface RegisterCodeCacheRepository extends CrudRepository<RegisterCodeCache, Long> {
}
