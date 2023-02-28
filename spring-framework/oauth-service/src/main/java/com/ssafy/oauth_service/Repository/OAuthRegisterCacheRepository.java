package com.ssafy.oauth_service.Repository;

import com.ssafy.oauth_service.dto.OAuthRegisterCache;
import org.springframework.data.repository.CrudRepository;

public interface OAuthRegisterCacheRepository extends CrudRepository<OAuthRegisterCache, String> {
}
