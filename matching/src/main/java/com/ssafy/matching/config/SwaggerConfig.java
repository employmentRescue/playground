package com.ssafy.matching.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableWebMvc
//@EnableSwagger2
public class SwaggerConfig {
	//http://localhost:8080/swagger-ui.html
	//http://localhost:8080/swagger-ui/index.html

	private ApiInfo info() {
		return new ApiInfoBuilder().title("Playground Matching Server API").build();
	}

	@Bean
	public Docket swaggerApi() {
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(info())
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.ssafy.matching"))
				.paths(PathSelectors.any())
//				.paths(PathSelectors.ant("/**"))
				.build();
	}
}

