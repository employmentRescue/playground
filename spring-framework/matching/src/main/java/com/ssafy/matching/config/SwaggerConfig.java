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
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;

@Configuration
@EnableWebMvc
//@EnableSwagger2
public class SwaggerConfig {
	//https://localhost:10003/swagger-ui/index.html
	//https://i8b309.p.ssafy.io:10003/swagger-ui/index.html

	private ApiInfo info() {
		return new ApiInfoBuilder().title("Playground Matching Server API").build();
	}

	@Bean
	public Docket swaggerApi() {
//		Server serverLocal = new Server("ec2", "https://i8b309.p.ssafy.io", "for 2c2 server", Collections.emptyList(), Collections.emptyList());
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(info())
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.ssafy.matching"))
				.paths(PathSelectors.any())
//				.paths(PathSelectors.ant("/**"))
				.build();
	}

	// swagger ui 설정.
	@Bean
	public UiConfiguration uiConfig() {
		return UiConfigurationBuilder.builder().displayRequestDuration(true).validatorUrl("").build();
	}
}