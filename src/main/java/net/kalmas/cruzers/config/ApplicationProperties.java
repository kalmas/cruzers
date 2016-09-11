package net.kalmas.cruzers.config;

import javax.servlet.Filter;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ShallowEtagHeaderFilter;

@Configuration
@ConfigurationProperties(prefix = "search-api")
public class ApplicationProperties
{
    /**
     * Create and use an embedded Elasticsearch node, seeded with
     * mock data. Used for end to end testing.
     */
    private Boolean embeddedTestElastic = false;

    public Boolean getEmbeddedTestElastic()
    {
        return this.embeddedTestElastic;
    }

    public void setEmbeddedTestElastic(final Boolean embeddedTestElastic)
    {
        this.embeddedTestElastic = embeddedTestElastic;
    }

    @Bean
    public Filter shallowEtagHeaderFilter() {
        return new ShallowEtagHeaderFilter();
    }
}
