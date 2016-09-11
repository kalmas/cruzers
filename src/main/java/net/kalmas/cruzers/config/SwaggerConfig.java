package net.kalmas.cruzers.config;

import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@PropertySource(value = "classpath:version.properties", ignoreResourceNotFound = true)
public class SwaggerConfig
{
    @Value("${version}")
    private String version;

    @SuppressWarnings("unchecked")
    private Predicate<String> excludePaths()
    {
        return Predicates.or(
            PathSelectors.regex("/error"));
    }

    @Bean
    public Docket messageApi()
    {
        final ApiInfo apiInfo = new ApiInfoBuilder()
                .title("Cruzers Songbook API")
                .contact(new Contact("Kyle Almas", "http://kalmas.net", "kylealmas@gmail.com"))
                .version(this.version)
                .build();

        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                    .apis(RequestHandlerSelectors.any())
                    .paths(Predicates.not(this.excludePaths()))
                    .build()
                .pathMapping("/")
                .directModelSubstitute(LocalDate.class, String.class)
                .genericModelSubstitutes(ResponseEntity.class)
                .useDefaultResponseMessages(false)
                .apiInfo(apiInfo);
    }
}
